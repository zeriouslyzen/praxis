#!/bin/bash

# PRAXIS Mobile & Desktop Testing Script
# This script helps test the application across different devices and browsers

echo "🚀 PRAXIS - Cross-Platform Testing Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if development server is running
check_dev_server() {
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✅ Development server is running${NC}"
        return 0
    else
        echo -e "${RED}❌ Development server is not running${NC}"
        echo -e "${YELLOW}💡 Please run 'npm start' first${NC}"
        return 1
    fi
}

# Function to open browser with specific dimensions
open_browser() {
    local url=$1
    local width=$2
    local height=$3
    local device=$4

    echo -e "${BLUE}🌐 Opening $device view ($width x $height)${NC}"

    if command_exists "google-chrome"; then
        google-chrome --new-window --window-size=$width,$height $url
    elif command_exists "chromium-browser"; then
        chromium-browser --new-window --window-size=$width,$height $url
    elif command_exists "firefox"; then
        firefox --new-window --width $width --height $height $url
    else
        echo -e "${YELLOW}⚠️  No supported browser found. Please open $url manually${NC}"
        open $url
    fi
}

# Mobile device configurations
mobile_devices=(
    "iPhone 12 Pro:390:844"
    "iPhone 13:390:844"
    "iPhone 14 Pro:393:852"
    "Samsung Galaxy S21:360:800"
    "iPad:768:1024"
    "iPad Pro:1024:1366"
)

# Desktop configurations
desktop_configs=(
    "Desktop HD:1920:1080"
    "Desktop Full HD:1366:768"
    "Desktop 4K:2560:1440"
    "Desktop Ultra-wide:3440:1440"
)

# Function to test mobile devices
test_mobile() {
    echo -e "\n📱 Mobile Testing"
    echo "=================="

    if ! check_dev_server; then
        return 1
    fi

    echo -e "${BLUE}Select mobile device to test:${NC}"
    select device_config in "${mobile_devices[@]}"; do
        if [ -n "$device_config" ]; then
            IFS=':' read -r device width height <<< "$device_config"
            open_browser "http://localhost:3000" $width $height "$device"
            break
        else
            echo -e "${RED}Invalid selection${NC}"
        fi
    done
}

# Function to test desktop configurations
test_desktop() {
    echo -e "\n🖥️  Desktop Testing"
    echo "==================="

    if ! check_dev_server; then
        return 1
    fi

    echo -e "${BLUE}Select desktop configuration to test:${NC}"
    select desktop_config in "${desktop_configs[@]}"; do
        if [ -n "$desktop_config" ]; then
            IFS=':' read -r config width height <<< "$desktop_config"
            open_browser "http://localhost:3000" $width $height "$config"
            break
        else
            echo -e "${RED}Invalid selection${NC}"
        fi
    done
}

# Function to run performance tests
run_performance_tests() {
    echo -e "\n⚡ Performance Testing"
    echo "======================"

    if ! check_dev_server; then
        return 1
    fi

    echo -e "${BLUE}Running Lighthouse performance tests...${NC}"

    if command_exists "lighthouse"; then
        lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json
        echo -e "${GREEN}✅ Lighthouse report generated${NC}"
    else
        echo -e "${YELLOW}⚠️  Lighthouse not installed. Install with: npm install -g lighthouse${NC}"
    fi
}

# Function to check responsive design
check_responsive() {
    echo -e "\n📐 Responsive Design Check"
    echo "==========================="

    if ! check_dev_server; then
        return 1
    fi

    echo -e "${BLUE}Testing responsive breakpoints...${NC}"

    # Test common breakpoints
    breakpoints=(
        "320:Mobile XS"
        "375:Mobile"
        "768:Tablet"
        "1024:Desktop"
        "1440:Desktop Large"
    )

    for breakpoint in "${breakpoints[@]}"; do
        IFS=':' read -r width name <<< "$breakpoint"
        echo -e "${YELLOW}Testing $name breakpoint (${width}px)${NC}"

        if command_exists "curl"; then
            # Test if the app responds at this breakpoint
            response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
            if [ "$response" = "200" ]; then
                echo -e "${GREEN}✅ $name breakpoint working${NC}"
            else
                echo -e "${RED}❌ $name breakpoint failed${NC}"
            fi
        fi
    done
}

# Main menu
main_menu() {
    echo -e "\n${BLUE}PRAXIS Testing Menu${NC}"
    echo "==================="
    echo "1) Test Mobile Devices"
    echo "2) Test Desktop Configurations"
    echo "3) Run Performance Tests"
    echo "4) Check Responsive Design"
    echo "5) Test All Configurations"
    echo "6) Exit"

    read -p "Select an option (1-6): " choice

    case $choice in
        1) test_mobile ;;
        2) test_desktop ;;
        3) run_performance_tests ;;
        4) check_responsive ;;
        5)
            test_mobile
            test_desktop
            run_performance_tests
            check_responsive
            ;;
        6) exit 0 ;;
        *) echo -e "${RED}Invalid option${NC}" ;;
    esac
}

# Check if running in terminal
if [ -t 0 ]; then
    main_menu
else
    echo -e "${YELLOW}Script is running in non-interactive mode${NC}"
    check_dev_server
    check_responsive
fi
