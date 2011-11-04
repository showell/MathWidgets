Canvas = ->
  width = 600
  height = 300

  canvas_html = """
    <canvas id='canvas' width='#{width}' height='#{height}' style='border: 1px blue solid'>
    </canvas>
  """
  $("#main").append canvas_html

  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")

  clear: ->
    canvas.width = width

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
  skew = 0
  height = 1
  
  rescale = (point) ->
    [x, y] = point
    x -= 4 # keep centroid centered
    x += y * skew
    x /= height
    y *= height
    [x * 40 + 300, -y * 40 + 150]
    
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
    
    redraw = ->
      canvas.clear()
      scaled_points = {}
      for vertex, point of points
        scaled_points[vertex] = rescale point
      
      for triangle in triangles
        [vertices, color] = triangle
        draw_triangle vertices, color, scaled_points
      
      vertices = (scaled_points[vertex] for vertex in ["E", "C", "K"])
      canvas.outline_triangle "black", vertices...

    redraw()
    
    $("#more_skew").click ->
      skew += 0.2
      redraw()
          
    $("#less_skew").click ->
      skew -= 0.2
      redraw()

    $("#taller").click ->
      height += 0.1
      redraw()
    
    $("#wider").click ->
      height -= 0.1
      redraw()

MultiplicationTables = ->
  max_prime_factor = (n) ->
    return n if n <= 15
    max = null
    for i in [2...n]
      break if i * 2 > n
      if n % i == 0
        max = i
        return max if i * i >= n
    return max if max
    return n if n <= 23
    return max_prime_factor(n+1)

  width = 10
  special_number = 10
  draw = ->
    html = """
      <h3>#{special_number}</h3>
    """
    for i in [1..special_number]
      if special_number % i == 0
        html += """
          #{i} * #{special_number / i} = <b>#{special_number}</b><br>
          """
    html += "<hr>"
    for i in [1..10]
      html += """
        <b>#{special_number}</b> * #{i} = #{special_number * i}<br>
        """
    facts = $ "<div>"
    facts.html html
    facts.css "border", "1px black solid"    
    $("#multi_right").html facts
        
    table = $("#multiplication")
    table.empty()
    height = Math.floor 169 / width
    max = null
    for n in [2, 3, 4, 5, 7, 11, 13, 17]
      if width % n == 0
        max = n
        
    for i in [0...height]
      tr = $ "<tr>"
      table.append tr
      for j in [0...width]
        n = i * width + j + 1
        if n % 15 == 0
          style = "background: #DDAAAA"
        else if n % 14 == 0
          style = "background: #00DDDD"
        else if n % 13 == 0
          style = "background: #FF00FF"
        else if n % 12 == 0
          style = "background: #BBBBBB"
        else if n % 11 == 0
          style = "background: #FFFF00"
        else if n % 10 == 0
          style = "background: #EEBBBB"
        else if n % 9 == 0
          style = "background: #00BB00"
        else if n % 8 == 0
          style = "background: #AAAAAA"
        else if n % 7 == 0
          style = "background: #00FFFF"
        else if n % 6 == 0
          style = "background: lightgreen"
        else if n % 5 == 0
          style = "background: pink"
        else if n % 3 == 0
          style = "background: lightgreen"
        else if n % 2 == 0
          style = "background: #DDDDDD"
        else
          style = ""
        td = $ "<td style='#{style}' align='center'>#{n}</td>"
        if max and (j + 1) % max == 0
          td.css "border-right", "2px black solid"
        td.attr "height", 40
        td.attr "width", 40
        td.attr "font-size", "13px"
        if n == special_number
          td.css "border", "5px black solid"
        else if special_number % n == 0
          td.css "border", "3px blue solid"
        else if n % special_number == 0
          td.css "border", "3px red solid"
        if (n % width == 0) or (n % (width-1) == 0) or (n % (width+1) == 0)
          td.css "font-weight", "bold"
        f = (n) ->
          td.click ->
            special_number = n
            width = max_prime_factor n
            draw()
        f(n)
        tr.append td
      tr.append $ "<td> #{i+1} * #{width} = #{(i+1)*(width)} </td>"

  $("#multi_wide").click ->
    width += 1
    draw()
    
  $("#multi_narrow").click ->
    width -= 1
    draw()
    
  $("#multi_plus_one").click ->
    special_number += 1
    width = max_prime_factor special_number
    draw()
    
  draw()

jQuery(document).ready ->
  canvas = Canvas()
  TwelveTriangles(canvas).draw()
  MultiplicationTables()