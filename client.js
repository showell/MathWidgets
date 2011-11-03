(function() {
  var Canvas, TwelveTriangles;
  var __slice = Array.prototype.slice;
  Canvas = function() {
    var canvas, canvas_html, ctx, height, width;
    width = 800;
    height = 800;
    canvas_html = "<canvas id='canvas' width='" + width + "' height='" + height + "' style='border: 1px blue solid'>\n</canvas>";
    $("#main").append(canvas_html);
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return {
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
    skew = 3.7;
    height = -1.5;
    rescale = function(point) {
      var x, y;
      x = point[0], y = point[1];
      x -= 4;
      x += y * skew;
      x /= height;
      y *= height;
      return [x * 40 + 300, -y * 40 + 200];
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
        var color, point, points, scaled_points, triangle, triangles, vertex, vertices, _i, _len;
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
        scaled_points = {};
        for (vertex in points) {
          point = points[vertex];
          scaled_points[vertex] = rescale(point);
        }
        triangles = [["ABE", "red"], ["BED", "green"], ["BCD", "blue"], ["DEF", "blue"], ["DFC", "green"], ["CFG", "red"], ["EFH", "pink"], ["FHK", "lightgreen"], ["FGK", "lightblue"], ["EIJ", "lightblue"], ["EJH", "lightgreen"], ["JHK", "pink"]];
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
      }
    };
  };
  jQuery(document).ready(function() {
    var canvas;
    canvas = Canvas();
    return TwelveTriangles(canvas).draw();
  });
}).call(this);
