Canvas = ->
  width = 800
  height = 800

  canvas_html = """
    <canvas id='canvas' width='#{width}' height='#{height}' style='border: 1px blue solid'>
    </canvas>
  """
  $("#main").append canvas_html

  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")

  draw_triangle: (color, point1, point2, point3) ->
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo point1...
    ctx.lineTo point2...
    ctx.lineTo point3...
    ctx.lineTo point1...
    ctx.fill()
    ctx.closePath()
  
  outline_triangle: (color, point1, point2, point3) ->
    console.log "in outline_triangle", point1
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo point1...
    ctx.lineTo point2...
    ctx.lineTo point3...
    ctx.lineTo point1...
    ctx.stroke()
    ctx.closePath()
  
TwelveTriangles = (canvas) ->
  skew = 3.7
  height = -1.5
  
  rescale = (point) ->
    [x, y] = point
    x -= 4 # keep centroid centered
    x += y * skew
    x /= height
    y *= height
    [x * 40 + 300, -y * 40 + 200]
    
  draw_triangle = (triangle, color, points) ->
    v0 = triangle.charAt(0)
    v1 = triangle.charAt(1)
    v2 = triangle.charAt(2)
    canvas.draw_triangle color, points[v0], points[v1], points[v2]
    
  draw: ->
    points =
      A: [0, 2]
      B: [2, 2]
      C: [6, 2]
      D: [3, 1]
      E: [0, 0]
      F: [4, 0]
      G: [6, 0]
      H: [3, -1]
      I: [0, -2]
      J: [2, -2]
      K: [6, -2]
      
    scaled_points = {}
    for vertex, point of points
      scaled_points[vertex] = rescale point
    triangles = [
      ["ABE", "red"]
      ["BED", "green"]
      ["BCD", "blue"]
      ["DEF", "blue"]
      ["DFC", "green"]
      ["CFG", "red"]
      #
      ["EFH", "pink"]
      ["FHK", "lightgreen"]
      ["FGK", "lightblue"]
      ["EIJ", "lightblue"]
      ["EJH", "lightgreen"]
      ["JHK", "pink"]
    ]
    
    for triangle in triangles
      [vertices, color] = triangle
      draw_triangle vertices, color, scaled_points
      
    vertices = (scaled_points[vertex] for vertex in ["E", "C", "K"])
    canvas.outline_triangle "black", vertices...

jQuery(document).ready ->
  canvas = Canvas()
  TwelveTriangles(canvas).draw()