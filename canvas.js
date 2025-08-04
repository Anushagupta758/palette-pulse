// ========================================
// CANVAS DRAG AND DROP FUNCTIONALITY
// ========================================

console.log("Canvas.js loaded!");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded!");
  // Initialize canvas functionality
  initCanvas();
});

// Also try initializing when window loads
window.addEventListener("load", function () {
  console.log("Window loaded!");
  if (!document.getElementById("wall-surface")) {
    console.log("Wall surface not found, retrying...");
    setTimeout(initCanvas, 1000);
  }
});

function initCanvas() {
  console.log("=== INITIALIZING CANVAS ===");

  // Check if we can find any elements at all
  console.log("Document ready state:", document.readyState);
  console.log("All divs:", document.querySelectorAll("div").length);
  console.log("All buttons:", document.querySelectorAll("button").length);
  console.log(
    "All elements with ID:",
    document.querySelectorAll("[id]").length
  );

  const wallSurface = document.getElementById("wall-surface");
  const colorSwatches = document.querySelectorAll(".color-swatch");
  const paintingItems = document.querySelectorAll(".painting-item");
  const resetBtn = document.getElementById("reset-canvas");
  const saveBtn = document.getElementById("save-design");

  console.log("Found elements:", {
    wallSurface: !!wallSurface,
    colorSwatches: colorSwatches.length,
    paintingItems: paintingItems.length,
    resetBtn: !!resetBtn,
    saveBtn: !!saveBtn,
  });

  let draggedElement = null;
  let paintingCounter = 0;

  // Color swatch drag events
  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("dragstart", handleColorDragStart);
    swatch.addEventListener("dragend", handleDragEnd);
  });

  // Painting item drag events
  paintingItems.forEach((item) => {
    item.addEventListener("dragstart", handlePaintingDragStart);
    item.addEventListener("dragend", handleDragEnd);
    console.log("Added drag events to painting:", item.dataset.painting);
  });

  // Wall surface drop events
  wallSurface.addEventListener("dragover", handleDragOver);
  wallSurface.addEventListener("drop", handleDrop);
  wallSurface.addEventListener("dragenter", handleDragEnter);
  wallSurface.addEventListener("dragleave", handleDragLeave);

  // Add drop events to the entire canvas area for better coverage
  const canvasArea = document.querySelector(".canvas-area");
  const wallCanvas = document.querySelector(".wall-canvas");

  // Add events to canvas area
  canvasArea.addEventListener("dragover", handleDragOver);
  canvasArea.addEventListener("drop", handleDrop);
  canvasArea.addEventListener("dragenter", handleDragEnter);
  canvasArea.addEventListener("dragleave", handleDragLeave);

  // Add events to wall canvas as well
  wallCanvas.addEventListener("dragover", handleDragOver);
  wallCanvas.addEventListener("drop", handleDrop);
  wallCanvas.addEventListener("dragenter", handleDragEnter);
  wallCanvas.addEventListener("dragleave", handleDragLeave);

  // Control buttons
  resetBtn.addEventListener("click", resetCanvas);
  saveBtn.addEventListener("click", saveDesign);

  // Initialize wall with default color
  wallSurface.style.backgroundColor = "#F5F5DC";

  // Custom color functionality
  const customColorInput = document.getElementById("custom-color-input");
  const applyColorBtn = document.getElementById("apply-custom-color");
  const colorPreview = document.getElementById("color-preview");

  // Update color preview as user types
  customColorInput.addEventListener("input", function () {
    const colorValue = this.value.trim();
    const isValidColor = /^#[0-9A-Fa-f]{6}$/.test(colorValue);

    if (isValidColor) {
      colorPreview.style.background = colorValue;
      colorPreview.textContent = colorValue;
      colorPreview.classList.add("has-color");
    } else {
      colorPreview.style.background = "#f5f5f5";
      colorPreview.textContent = "Enter valid hex color";
      colorPreview.classList.remove("has-color");
    }
  });

  // Apply custom color to wall
  applyColorBtn.addEventListener("click", function () {
    const colorValue = customColorInput.value.trim();
    const isValidColor = /^#[0-9A-Fa-f]{6}$/.test(colorValue);

    if (isValidColor) {
      wallSurface.style.backgroundColor = colorValue;
      showNotification("Custom color applied to wall!", "success");
    } else {
      showNotification(
        "Please enter a valid hex color code (e.g., #FF5733)",
        "error"
      );
    }
  });

  // Allow Enter key to apply color
  customColorInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      applyColorBtn.click();
    }
  });
}

function handleColorDragStart(e) {
  draggedElement = e.target;
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.dataset.color);
  e.dataTransfer.effectAllowed = "copy";
}

function handlePaintingDragStart(e) {
  // Find the actual painting item (not the image inside it)
  const paintingItem = e.target.closest(".painting-item");
  if (!paintingItem) return;

  draggedElement = paintingItem;
  paintingItem.classList.add("dragging");
  e.dataTransfer.setData("text/plain", paintingItem.dataset.painting);
  e.dataTransfer.effectAllowed = "copy";

  console.log("Drag started for painting:", paintingItem.dataset.painting);
}

function handleDragEnd(e) {
  // Find the actual painting item (not the image inside it)
  const paintingItem = e.target.closest(".painting-item");
  if (paintingItem) {
    paintingItem.classList.remove("dragging");
  }
  draggedElement = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";

  // Add visual feedback for any drag over the canvas area
  const canvasArea = document.querySelector(".canvas-area");
  const wallCanvas = document.querySelector(".wall-canvas");

  if (canvasArea && !canvasArea.classList.contains("drag-over")) {
    canvasArea.classList.add("drag-over");
  }
  if (wallCanvas && !wallCanvas.classList.contains("drag-over")) {
    wallCanvas.classList.add("drag-over");
  }
}

function handleDragEnter(e) {
  e.preventDefault();
  const wallSurface = document.getElementById("wall-surface");
  const canvasArea = document.querySelector(".canvas-area");
  const wallCanvas = document.querySelector(".wall-canvas");

  // Add drag-over class to all relevant elements
  if (wallSurface) wallSurface.classList.add("drag-over");
  if (canvasArea) canvasArea.classList.add("drag-over");
  if (wallCanvas) wallCanvas.classList.add("drag-over");
}

function handleDragLeave(e) {
  const wallSurface = document.getElementById("wall-surface");
  const canvasArea = document.querySelector(".canvas-area");
  const wallCanvas = document.querySelector(".wall-canvas");

  // Remove drag-over class from all relevant elements
  if (wallSurface) wallSurface.classList.remove("drag-over");
  if (canvasArea) canvasArea.classList.remove("drag-over");
  if (wallCanvas) wallCanvas.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  // Remove drag-over classes from all elements
  const wallSurface = document.getElementById("wall-surface");
  const canvasArea = document.querySelector(".canvas-area");
  const wallCanvas = document.querySelector(".wall-canvas");

  if (wallSurface) wallSurface.classList.remove("drag-over");
  if (canvasArea) canvasArea.classList.remove("drag-over");
  if (wallCanvas) wallCanvas.classList.remove("drag-over");

  const data = e.dataTransfer.getData("text/plain");
  console.log("Drop event - data:", data);
  console.log("Drop event - draggedElement:", draggedElement);
  console.log(
    "Drop event - draggedElement classes:",
    draggedElement ? draggedElement.className : "none"
  );

  if (draggedElement && draggedElement.classList.contains("color-swatch")) {
    wallSurface.style.backgroundColor = data;
    showNotification("Wall color changed!", "success");
  } else if (
    draggedElement &&
    draggedElement.classList.contains("painting-item")
  ) {
    console.log("Processing painting drop with data:", data);
    addPaintingToWall(data);
    showNotification("Painting added to wall!", "success");
  } else if (data && data !== "") {
    console.log("Processing fallback painting drop with data:", data);
    addPaintingToWall(data);
    showNotification("Painting added to wall!", "success");
  }
}

function addPaintingToWall(paintingType, x, y) {
  console.log("addPaintingToWall called with:", paintingType);
  const wallSurface = document.getElementById("wall-surface");
  const paintingData = getPaintingData(paintingType);

  if (!paintingData) {
    console.log("No painting data found for:", paintingType);
    return;
  }

  // Remove any existing paintings first
  const existingPaintings = wallSurface.querySelectorAll(".painting-on-wall");
  existingPaintings.forEach((painting) => painting.remove());

  const paintingElement = document.createElement("div");
  paintingElement.className = "painting-on-wall";
  paintingElement.dataset.paintingId = `painting-${++paintingCounter}`;

  // Use larger painting size
  const paintingWidth = 250;
  const paintingHeight = 200;
  const wallWidth = wallSurface.offsetWidth;
  const wallHeight = wallSurface.offsetHeight;

  // Always center the painting on the wall regardless of drop location
  const finalX = (wallWidth - paintingWidth) / 2;
  const finalY = (wallHeight - paintingHeight) / 2;

  console.log("Wall dimensions:", wallWidth, wallHeight);
  console.log("Painting dimensions:", paintingWidth, paintingHeight);
  console.log("Final position:", finalX, finalY);

  paintingElement.style.left = `${finalX}px`;
  paintingElement.style.top = `${finalY}px`;

  // Create painting content with clean image display
  paintingElement.innerHTML = `
        <img src="${paintingData.src}" alt="${paintingData.alt}" 
             style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; z-index: 10;" 
             onload="console.log('Image loaded successfully:', '${paintingData.src}')"
             onerror="console.log('Image failed to load:', '${paintingData.src}'); this.style.display='none';" />
        <button class="remove-btn" onclick="removePainting(this)">×</button>
    `;

  // Make the painting draggable
  makePaintingDraggable(paintingElement);

  wallSurface.appendChild(paintingElement);
  console.log("Painting element added to DOM:", paintingElement);
  console.log("Painting element HTML:", paintingElement.outerHTML);
  console.log("Wall surface children count:", wallSurface.children.length);
}

function getPaintingData(paintingType) {
  console.log("getPaintingData called with:", paintingType);
  const paintings = {
    ocean: {
      src: "images/Ocean.webp",
      alt: "Ocean Dreams",
    },
    sunset: {
      src: "images/Sunset.webp",
      alt: "Sunset Valley",
    },
    geometric: {
      src: "images/Geometric.webp",
      alt: "Urban Geometry",
    },
    forest: {
      src: "images/Forest1.webp",
      alt: "Forest Stream",
    },
    bw1: {
      src: "images/BW1.webp",
      alt: "Minimalist BW",
    },
    bw2: {
      src: "images/BW2.webp",
      alt: "Abstract BW",
    },
    modern: {
      src: "images/Modern Wall art 4.webp",
      alt: "Modern Wall Art",
    },
    boho: {
      src: "images/Boho wall modern 1.webp",
      alt: "Boho Wall Art",
    },
    tropical: {
      src: "images/Set of 3, Green And Gold Tropical Leaf Modern Art Set 5.webp",
      alt: "Tropical Leaves",
    },
    panther: {
      src: "images/Set of 2 Black Panther Panels, Modern Art 2    3.webp",
      alt: "Black Panther Art",
    },
    rings: {
      src: "images/1-Image-Rings-III-BW_720x Black and white 4.webp",
      alt: "Rings Art",
    },
    river: {
      src: "images/1-Image-River-Path_720x Black and white 3.webp",
      alt: "River Path",
    },
    simplicity: {
      src: "images/1-Image-Simplicity-BW_720x Black and white1.webp",
      alt: "Simplicity",
    },
  };

  const result = paintings[paintingType];
  console.log("getPaintingData result:", result);
  return result;
}

function makePaintingDraggable(paintingElement) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  paintingElement.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  function dragStart(e) {
    if (e.target.classList.contains("remove-btn")) return;

    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === paintingElement || paintingElement.contains(e.target)) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, paintingElement);
    }
  }

  function setTranslate(xPos, yPos, el) {
    const wallSurface = document.getElementById("wall-surface");
    const wallRect = wallSurface.getBoundingClientRect();
    const paintingRect = el.getBoundingClientRect();

    // Constrain painting within wall bounds
    const maxX = wallSurface.offsetWidth - paintingRect.width;
    const maxY = wallSurface.offsetHeight - paintingRect.height;

    const constrainedX = Math.max(0, Math.min(xPos, maxX));
    const constrainedY = Math.max(0, Math.min(yPos, maxY));

    el.style.left = `${constrainedX}px`;
    el.style.top = `${constrainedY}px`;
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }
}

function removePainting(button) {
  const painting = button.parentElement;
  painting.remove();
  showNotification("Painting removed!", "info");
}

function resetCanvas() {
  const wallSurface = document.getElementById("wall-surface");
  const paintings = wallSurface.querySelectorAll(".painting-on-wall");

  // Remove all paintings
  paintings.forEach((painting) => painting.remove());

  // Reset wall color to default
  wallSurface.style.backgroundColor = "#F5F5DC";

  // Reset counter
  paintingCounter = 0;

  showNotification("Canvas reset!", "success");
}

function saveDesign() {
  // Create a data URL of the canvas
  const wallSurface = document.getElementById("wall-surface");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = wallSurface.offsetWidth;
  canvas.height = wallSurface.offsetHeight;

  // Draw wall background
  ctx.fillStyle = wallSurface.style.backgroundColor || "#F5F5DC";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Convert to data URL
  const dataURL = canvas.toDataURL("image/png");

  // Create download link
  const link = document.createElement("a");
  link.download = "palette-pulse-design.png";
  link.href = dataURL;
  link.click();

  showNotification("Design saved!", "success");
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-family: var(--font-primary);
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Global function for removing paintings (called from HTML)
window.removePainting = removePainting;
