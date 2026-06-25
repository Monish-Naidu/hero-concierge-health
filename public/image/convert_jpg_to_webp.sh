#!/bin/bash

# Script to convert all JPG, JPEG, and PNG files to WebP format with optimization
# Optimized for web and mobile devices

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Quality for WebP (80 is a good balance between quality and file size for web)
QUALITY=80

# Function to get file size in a human-readable format
get_file_size() {
    local file="$1"
    local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    
    if [ $size -gt 1048576 ]; then
        # Show in MB
        local mb=$((size / 1048576))
        local remainder=$(( (size % 1048576) * 100 / 1048576 ))
        echo "${mb}.${remainder}MB"
    else
        # Show in KB
        local kb=$((size / 1024))
        echo "${kb}KB"
    fi
}

# Function to convert JPG/JPEG/PNG to WebP
convert_to_webp() {
    local input="$1"
    local output=""
    
    # Handle .jpg, .jpeg, and .png extensions
    if [[ "$input" == *.jpg ]]; then
        output="${input%.jpg}.webp"
    elif [[ "$input" == *.jpeg ]]; then
        output="${input%.jpeg}.webp"
    elif [[ "$input" == *.png ]]; then
        output="${input%.png}.webp"
    else
        echo "✗ Unknown file extension: $input"
        return 1
    fi
    
    # Skip if WebP already exists
    if [ -f "$output" ]; then
        echo "⊘ Skipping $input (WebP already exists)"
        return 2
    fi
    
    local input_size=$(get_file_size "$input")
    local input_bytes=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    
    echo "→ Converting $(basename "$input") (${input_size})..."
    
    # Convert to WebP with optimization for web and mobile
    # -q: quality (0-100, 80 is good for web)
    # -m: compression method (0-6, 6 is best but slower)
    # -mt: multi-threading for faster processing
    if cwebp -q $QUALITY -m 6 -mt "$input" -o "$output" 2>/dev/null; then
        if [ -f "$output" ]; then
            local output_size=$(get_file_size "$output")
            local output_bytes=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
            
            if [ $input_bytes -gt 0 ] && [ $output_bytes -gt 0 ]; then
                local saved=$((input_bytes - output_bytes))
                local reduction=$((saved * 100 / input_bytes))
                echo "✓ Success: $(basename "$output")"
                echo "  ${input_size} → ${output_size} (saved ${reduction}%)"
                return 0
            else
                echo "✓ Success: $(basename "$output")"
                echo "  ${input_size} → ${output_size}"
                return 0
            fi
        else
            echo "✗ Failed: Output file was not created"
            return 1
        fi
    else
        echo "✗ Failed to convert $input"
        return 1
    fi
}

echo "========================================="
echo "Image to WebP Converter"
echo "JPG, JPEG, and PNG to WebP"
echo "Optimized for web and mobile devices"
echo "========================================="
echo "Quality: ${QUALITY}%"
echo "Compression: Maximum (method 6)"
echo "Scanning: All subdirectories recursively"
echo ""

# Count image files before conversion (recursively in all subdirectories)
image_count_before=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l | tr -d ' ')

if [ "$image_count_before" -eq 0 ]; then
    echo "No JPG/JPEG/PNG files found in current directory and subdirectories."
    echo "Current directory: $(pwd)"
    exit 0
fi

echo "Found ${image_count_before} image file(s) to process (JPG/JPEG/PNG)"
echo "Searching in all subdirectories..."
echo ""

# Find all directories with image files for better reporting
directories_with_images=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec dirname {} \; 2>/dev/null | sort -u)

if [ -n "$directories_with_images" ]; then
    echo "Directories to process:"
    echo "$directories_with_images" | while read -r dir; do
        count=$(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l | tr -d ' ')
        if [ "$count" -gt 0 ]; then
            echo "  - $dir ($count file(s))"
        fi
    done
    echo ""
fi

# Find and convert all JPG/JPEG/PNG files in current directory and ALL subdirectories
processed=0
converted=0
skipped=0
failed=0

while IFS= read -r image_file; do
    convert_to_webp "$image_file"
    exit_code=$?
    processed=$((processed + 1))
    
    case $exit_code in
        0)
            converted=$((converted + 1))
            ;;
        2)
            skipped=$((skipped + 1))
            ;;
        *)
            failed=$((failed + 1))
            ;;
    esac
    echo ""
done < <(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null)

# Count results (recursively in all subdirectories)
webp_count=$(find . -type f -name "*.webp" 2>/dev/null | wc -l | tr -d ' ')

echo "========================================="
echo "Conversion Summary:"
echo "  Total files found: ${image_count_before}"
echo "  Files processed: ${processed}"
echo "  ✓ Successfully converted: ${converted}"
echo "  ⊘ Skipped (already exists): ${skipped}"
echo "  ✗ Failed: ${failed}"
echo "  Total WebP files in directory: ${webp_count}"
echo "========================================="
echo ""
echo "Done! All JPG/JPEG/PNG files have been converted to WebP format."
echo "Processed all subdirectories in: $(pwd)"

