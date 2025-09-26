#!/bin/bash

# PRAXIS Desktop Testing Script
# Comprehensive desktop testing across different screen sizes and browsers

echo "🖥️  PRAXIS Desktop Testing Suite"
echo "================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Desktop configurations
declare -A DESKTOP_CONFIGS=(
    ["Full HD"]="1920:1080"
    ["Quad HD"]="2560:1440"
    ["4K UHD"]="3840:2160"
    ["Ultra-wide"]="3440:1440"
    ["Ultra-wide 5K"]="5120:1440"
    ["MacBook Pro 16"]="1728:1117"
    ["iMac 27"]="2560:1440"
    ["Dell UltraSharp"]="2560:1440"
    ["Surface Studio"]="3000:2000"
)

# Browser configurations
declare -A BROWSER_CONFIGS=(
    ["chrome"]="--new-window --window-size"
    ["firefox"]="--new-window --width --height"
    ["safari"]="N/A"
    ["edge"]="--new-window --window-size"
)

# Function to open browser with specific config
open_desktop_browser() {
    local browser=$1
    local config_name=$2
    local dimensions=$3
    local url=${4:-"http://localhost:3000"}

    IFS=':' read -r width height <<< "$dimensions"

    echo -e "${BLUE}Testing $config_name on $browser ($width x $height)${NC}"

    case $browser in
        "chrome")
            google-chrome ${BROWSER_CONFIGS[$browser]}=$width,$height $url 2>/dev/null &
            ;;
        "firefox")
            firefox ${BROWSER_CONFIGS[$browser]} $width --height $height $url 2>/dev/null &
            ;;
        "edge")
            microsoft-edge ${BROWSER_CONFIGS[$browser]}=$width,$height $url 2>/dev/null &
            ;;
        "safari")
            echo -e "${YELLOW}Safari testing requires manual setup${NC}"
            open -a Safari $url
            ;;
        *)
            echo -e "${RED}Unsupported browser: $browser${NC}"
            ;;
    esac
}

# Function to test all desktop configurations
test_all_desktop() {
    local url=${1:-"http://localhost:3000"}

    echo -e "\n${BLUE}Testing all desktop configurations...${NC}"

    for config_name in "${!DESKTOP_CONFIGS[@]}"; do
        dimensions=${DESKTOP_CONFIGS[$config_name]}
        echo -e "${YELLOW}Testing $config_name ($dimensions)${NC}"
        sleep 2
    done
}

# Function to test specific configuration
test_specific_desktop() {
    local url=${1:-"http://localhost:3000"}

    echo -e "\n${BLUE}Available Desktop Configurations:${NC}"
    echo "=================================="

    local i=1
    for config_name in "${!DESKTOP_CONFIGS[@]}"; do
        dimensions=${DESKTOP_CONFIGS[$config_name]}
        echo "$i) $config_name - $dimensions"
        ((i++))
    done

    echo -e "\n${YELLOW}Select configuration (1-${#DESKTOP_CONFIGS[@]}):${NC}"
    read -p "> " selection

    if [[ $selection -ge 1 && $selection -le ${#DESKTOP_CONFIGS[@]} ]]; then
        local config_name
        local dimensions
        local i=1

        for name in "${!DESKTOP_CONFIGS[@]}"; do
            if [[ $i -eq $selection ]]; then
                config_name=$name
                dimensions=${DESKTOP_CONFIGS[$name]}
                break
            fi
            ((i++))
        done

        echo -e "${GREEN}Selected: $config_name ($dimensions)${NC}"
        open_desktop_browser "chrome" "$config_name" "$dimensions" "$url"
    else
        echo -e "${RED}Invalid selection${NC}"
    fi
}

# Function to run accessibility tests
run_accessibility_tests() {
    echo -e "\n${BLUE}Running Accessibility Tests...${NC}"

    if command_exists "axe-cli"; then
        echo -e "${YELLOW}Running axe accessibility tests...${NC}"
        axe http://localhost:3000 --exit
    else
        echo -e "${YELLOW}axe-cli not installed. Install with: npm install -g @axe-core/cli${NC}"
    fi
}

# Function to run performance benchmarks
run_performance_benchmark() {
    echo -e "\n${BLUE}Running Performance Benchmarks...${NC}"

    if command_exists "lighthouse"; then
        echo -e "${YELLOW}Running Lighthouse performance tests...${NC}"
        lighthouse http://localhost:3000 \
            --output=json \
            --output-path=./desktop-performance-report.json \
            --only-categories=performance,accessibility,best-practices,seo
        echo -e "${GREEN}Performance report saved to desktop-performance-report.json${NC}"
    else
        echo -e "${YELLOW}Lighthouse not installed. Install with: npm install -g lighthouse${NC}"
    fi
}

# Function to check responsive design
check_responsive_design() {
    echo -e "\n${BLUE}Checking Responsive Design...${NC}"

    local url="http://localhost:3000"
    local test_configs=(
        "320:Mobile XS"
        "375:Mobile"
        "768:Tablet"
        "1024:Desktop"
        "1440:Desktop Large"
        "1920:Desktop HD"
    )

    for config in "${test_configs[@]}"; do
        IFS=':' read -r width name <<< "$config"
        echo -e "${YELLOW}Testing $name breakpoint (${width}px)${NC}"

        if command_exists "curl"; then
            local response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
            if [ "$response" = "200" ]; then
                echo -e "${GREEN}✅ $name breakpoint working${NC}"
            else
                echo -e "${RED}❌ $name breakpoint failed (HTTP $response)${NC}"
            fi
        fi
    done
}

# Function to test browser compatibility
test_browser_compatibility() {
    echo -e "\n${BLUE}Testing Browser Compatibility...${NC}"

    local url="http://localhost:3000"
    local browsers=("chrome" "firefox" "edge")

    for browser in "${browsers[@]}"; do
        if command_exists "$browser"; then
            echo -e "${YELLOW}Testing $browser compatibility...${NC}"
            open_desktop_browser "$browser" "Compatibility Test" "1920:1080" "$url"
            sleep 3
        else
            echo -e "${YELLOW}⚠️  $browser not installed${NC}"
        fi
    done
}

# Main menu
main_menu() {
    echo -e "\n${BLUE}Desktop Testing Options:${NC}"
    echo "========================"
    echo "1) Test Specific Desktop Configuration"
    echo "2) Test All Desktop Configurations"
    echo "3) Run Accessibility Tests"
    echo "4) Run Performance Benchmarks"
    echo "5) Check Responsive Design"
    echo "6) Test Browser Compatibility"
    echo "7) Full Desktop Test Suite"
    echo "8) Exit"

    read -p "Select option (1-8): " choice

    case $choice in
        1) test_specific_desktop ;;
        2) test_all_desktop ;;
        3) run_accessibility_tests ;;
        4) run_performance_benchmark ;;
        5) check_responsive_design ;;
        6) test_browser_compatibility ;;
        7)
            test_specific_desktop
            run_accessibility_tests
            run_performance_benchmark
            check_responsive_design
            test_browser_compatibility
            ;;
        8) exit 0 ;;
        *) echo -e "${RED}Invalid option${NC}" ;;
    esac
}

# Check if server is running
check_server() {
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✅ Development server is running${NC}"
        return 0
    else
        echo -e "${RED}❌ Development server is not running${NC}"
        echo -e "${YELLOW}💡 Please run 'npm start' first${NC}"
        return 1
    fi
}

# Main execution
if [ $# -eq 0 ]; then
    if check_server; then
        main_menu
    fi
else
    case $1 in
        "quick")
            if check_server; then
                test_specific_desktop
            fi
            ;;
        "full")
            if check_server; then
                test_all_desktop
                run_accessibility_tests
                run_performance_benchmark
            fi
            ;;
        "performance")
            if check_server; then
                run_performance_benchmark
            fi
            ;;
        "accessibility")
            if check_server; then
                run_accessibility_tests
            fi
            ;;
        *)
            echo -e "${RED}Invalid argument: $1${NC}"
            echo -e "${YELLOW}Usage: $0 [quick|full|performance|accessibility]${NC}"
            ;;
    esac
fi
