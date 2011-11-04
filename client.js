(function() {
  var Canvas, MultiplicationTables, TwelveTriangles;
  var __slice = Array.prototype.slice;
  Canvas = function() {
    var canvas, canvas_html, ctx, height, width;
    width = 600;
    height = 300;
    canvas_html = "<canvas id='canvas' width='" + width + "' height='" + height + "' style='border: 1px blue solid'>\n</canvas>";
    $("#main").append(canvas_html);
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return {
      clear: function() {
        return canvas.width = width;
      },
      draw_triangle: function(color, point1, point2, point3) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo.apply(ctx, point1);
        ctx.lineTo.apply(ctx, point2);
        ctx.lineTo.apply(ctx, point3);
        ctx.lineTo.apply(ctx, point1);
        ctx.fill();
        return ctx.closePath();
      },
      outline_triangle: function(color, point1, point2, point3) {
        console.log("in outline_triangle", point1);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo.apply(ctx, point1);
        ctx.lineTo.apply(ctx, point2);
        ctx.lineTo.apply(ctx, point3);
        ctx.lineTo.apply(ctx, point1);
        ctx.stroke();
        return ctx.closePath();
      }
    };
  };
  TwelveTriangles = function(canvas) {
    var draw_triangle, height, rescale, skew;
    skew = 0;
    height = 1;
    rescale = function(point) {
      var x, y;
      x = point[0], y = point[1];
      x -= 4;
      x += y * skew;
      x /= height;
      y *= height;
      return [x * 40 + 300, -y * 40 + 150];
    };
    draw_triangle = function(triangle, color, points) {
      var v0, v1, v2;
      v0 = triangle.charAt(0);
      v1 = triangle.charAt(1);
      v2 = triangle.charAt(2);
      return canvas.draw_triangle(color, points[v0], points[v1], points[v2]);
    };
    return {
      draw: function() {
        var points, redraw, triangles;
        points = {
          A: [0, 2],
          B: [2, 2],
          C: [6, 2],
          D: [3, 1],
          E: [0, 0],
          F: [4, 0],
          G: [6, 0],
          H: [3, -1],
          I: [0, -2],
          J: [2, -2],
          K: [6, -2]
        };
        triangles = [["ABE", "red"], ["BED", "green"], ["BCD", "blue"], ["DEF", "blue"], ["DFC", "green"], ["CFG", "red"], ["EFH", "pink"], ["FHK", "lightgreen"], ["FGK", "lightblue"], ["EIJ", "lightblue"], ["EJH", "lightgreen"], ["JHK", "pink"]];
        redraw = function() {
          var color, point, scaled_points, triangle, vertex, vertices, _i, _len;
          canvas.clear();
          scaled_points = {};
          for (vertex in points) {
            point = points[vertex];
            scaled_points[vertex] = rescale(point);
          }
          for (_i = 0, _len = triangles.length; _i < _len; _i++) {
            triangle = triangles[_i];
            vertices = triangle[0], color = triangle[1];
            draw_triangle(vertices, color, scaled_points);
          }
          vertices = (function() {
            var _j, _len2, _ref, _results;
            _ref = ["E", "C", "K"];
            _results = [];
            for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
              vertex = _ref[_j];
              _results.push(scaled_points[vertex]);
            }
            return _results;
          })();
          return canvas.outline_triangle.apply(canvas, ["black"].concat(__slice.call(vertices)));
        };
        redraw();
        $("#more_skew").click(function() {
          skew += 0.2;
          return redraw();
        });
        $("#less_skew").click(function() {
          skew -= 0.2;
          return redraw();
        });
        $("#taller").click(function() {
          height += 0.1;
          return redraw();
        });
        return $("#wider").click(function() {
          height -= 0.1;
          return redraw();
        });
      }
    };
  };
  MultiplicationTables = function() {
    var draw, width;
    draw = function(width) {
      var height, i, j, max, n, style, table, td, tr, _i, _len, _ref, _results;
      table = $("#multiplication");
      table.empty();
      height = Math.floor(169 / width);
      max = null;
      _ref = [2, 3, 4, 5, 7, 11, 13, 17];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (width % n === 0) {
          max = n;
        }
      }
      _results = [];
      for (i = 0; 0 <= height ? i < height : i > height; 0 <= height ? i++ : i--) {
        tr = $("<tr>");
        table.append(tr);
        for (j = 0; 0 <= width ? j < width : j > width; 0 <= width ? j++ : j--) {
          n = i * width + j + 1;
          if (n % 13 === 0) {
            style = "background: #FF00FF";
          } else if (n % 11 === 0) {
            style = "background: #FFFF00";
          } else if (n % 7 === 0) {
            style = "background: #00FFFF";
          } else if (n % 5 === 0) {
            style = "background: red";
          } else if (n % 3 === 0) {
            style = "background: lightblue";
          } else if (n % 2 === 0) {
            style = "background: #DDDDDD";
          } else {
            style = "";
          }
          td = $("<td style='" + style + "'>" + n + "</td>");
          if (max && (j + 1) % max === 0) {
            td.css("border-right", "2px black solid");
          }
          td.attr("height", 30);
          td.attr("width", 30);
          tr.append(td);
        }
        _results.push(tr.append($("<td> " + (i + 1) + " * " + width + " = " + ((i + 1) * width) + " </td>")));
      }
      return _results;
    };
    width = 10;
    $("#multi_wide").click(function() {
      width += 1;
      return draw(width);
    });
    $("#multi_narrow").click(function() {
      width -= 1;
      return draw(width);
    });
    return draw(width);
  };
  jQuery(document).ready(function() {
    var canvas;
    canvas = Canvas();
    TwelveTriangles(canvas).draw();
    return MultiplicationTables();
  });
}).call(this);