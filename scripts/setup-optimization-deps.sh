#!/bin/bash

echo "🔧 INSTALACIÓN DE DEPENDENCIAS PARA OPTIMIZACIÓN MULTIMEDIA"
echo "=========================================================="

# Detectar sistema operativo
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Detectado: macOS"
    
    # Verificar si Homebrew está instalado
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew no encontrado. Instalando Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    echo "📦 Instalando FFmpeg..."
    brew install ffmpeg
    
    echo "🖼️  Instalando ImageMagick..."
    brew install imagemagick
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Detectado: Linux"
    
    # Detectar distribución
    if command -v apt-get &> /dev/null; then
        echo "📦 Instalando FFmpeg y ImageMagick (Ubuntu/Debian)..."
        sudo apt-get update
        sudo apt-get install -y ffmpeg imagemagick
    elif command -v yum &> /dev/null; then
        echo "📦 Instalando FFmpeg y ImageMagick (RHEL/CentOS)..."
        sudo yum install -y ffmpeg ImageMagick
    elif command -v pacman &> /dev/null; then
        echo "📦 Instalando FFmpeg y ImageMagick (Arch)..."
        sudo pacman -S ffmpeg imagemagick
    else
        echo "⚠️  Distribución no reconocida. Instala manualmente:"
        echo "   - FFmpeg: https://ffmpeg.org/download.html"
        echo "   - ImageMagick: https://imagemagick.org/script/download.php"
    fi
    
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "🪟 Detectado: Windows"
    echo "📦 Para Windows, instala usando Chocolatey:"
    echo "   choco install ffmpeg imagemagick"
    echo "   O descarga manualmente desde:"
    echo "   - FFmpeg: https://ffmpeg.org/download.html#build-windows"
    echo "   - ImageMagick: https://imagemagick.org/script/download.php#windows"
fi

echo ""
echo "✅ Verificando instalación..."

# Verificar FFmpeg
if command -v ffmpeg &> /dev/null; then
    echo "✅ FFmpeg instalado correctamente"
    ffmpeg -version | head -1
else
    echo "❌ FFmpeg no encontrado"
fi

# Verificar ImageMagick
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick instalado correctamente"
    convert -version | head -1
else
    echo "❌ ImageMagick no encontrado"
fi

echo ""
echo "🎉 Instalación completada!"
echo "Ahora puedes ejecutar: node scripts/optimize-multimedia-2025.js" 