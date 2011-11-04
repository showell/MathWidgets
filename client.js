(function() {
  var Canvas, MultiplicationTables, TwelveTriangles;
  var __slice = Array.prototype.slice;
  Canvas = function(div) {
    var canvas, canvas_html, ctx, height, width;
    width = 600;
    height = 300;
    canvas_html = "<canvas id='canvas' width='" + width + "' height='" + height + "' style='border: 1px blue solid'>\n</canvas>";
    div.append(canvas_html);
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return {
      clear: function() {
        return canvas.width = width;
      },
      draw_polygon: function() {
        var color, more_points, point, point1, _i, _len;
        color = arguments[0], point1 = arguments[1], more_points = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo.apply(ctx, point1);
        for (_i = 0, _len = more_points.length; _i < _len; _i++) {
          point = more_points[_i];
          ctx.lineTo.apply(ctx, point);
        }
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
  TwelveTriangles = function() {
    var canvas, draw, draw_triangle, height, rescale, skew;
    canvas = Canvas($("#twelve_triangles"));
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
      return canvas.draw_polygon(color, points[v0], points[v1], points[v2]);
    };
    draw = function() {
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
    };
    return draw();
  };
  MultiplicationTables = function() {
    var colors, draw, max_prime_factor, set_color, special_number, width;
    colors = {
      2: "#EEEEEE",
      4: "#CCCCCC",
      8: "#AAAAAA",
      16: "#999999",
      3: "#EEAAAA",
      6: "#DDAAAA",
      9: "#CCAAAA",
      11: "DD6666",
      5: "#AAEEAA",
      10: "#AADDAA",
      15: "#AACCAA",
      20: "#AABBAA",
      7: "#AAAADD",
      14: "#AAAACC",
      12: "#00FFFF",
      13: "#FFFF00",
      17: "#FF00FF",
      18: "#55DD55",
      19: "#DD00DD"
    };
    set_color = function(n, width) {
      var color, delta, i, _i, _len, _ref, _step;
      color = "white";
      _ref = [0, 1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        delta = _ref[_i];
        i = width + delta;
        if (n % i === 0 && colors[i]) {
          return colors[i];
        }
      }
      for (i = 20, _step = -1; i >= 1; i += _step) {
        if (n % i === 0 && width % i === 0 && colors[i]) {
          return colors[i];
        }
      }
      if (n % 2 === 0) {
        return colors[2];
      }
      return color;
    };
    max_prime_factor = function(n) {
      var i, max;
      if (n <= 15) {
        return n;
      }
      max = null;
      for (i = 2; 2 <= n ? i < n : i > n; 2 <= n ? i++ : i--) {
        if (i * 2 > n) {
          break;
        }
        if (n % i === 0) {
          max = i;
          if (i * i >= n) {
            return max;
          }
        }
      }
      if (max) {
        return max;
      }
      if (n <= 23) {
        return n;
      }
      return max_prime_factor(n + 1);
    };
    width = 10;
    special_number = 10;
    draw = function() {
      var color, f, facts, height, html, i, j, max, n, style, table, td, tr, _i, _len, _ref, _results;
      html = "<h3>" + special_number + "</h3>";
      for (i = 1; 1 <= special_number ? i <= special_number : i >= special_number; 1 <= special_number ? i++ : i--) {
        if (special_number % i === 0) {
          html += "" + i + " * " + (special_number / i) + " = <b>" + special_number + "</b><br>";
        }
      }
      html += "<hr>";
      for (i = 1; i <= 10; i++) {
        html += "<b>" + special_number + "</b> * " + i + " = " + (special_number * i) + "<br>";
      }
      facts = $("<div>");
      facts.html(html);
      facts.css("border", "1px black solid");
      $("#multi_right").html(facts);
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
          color = set_color(n, width);
          style = "background: " + color;
          td = $("<td style='" + style + "' align='center'>" + n + "</td>");
          if (max && (j + 1) % max === 0) {
            td.css("border-right", "2px black solid");
          }
          td.attr("height", 40);
          td.attr("width", 40);
          td.attr("font-size", "13px");
          if (n === special_number) {
            td.css("border", "5px black solid");
          } else if (special_number % n === 0) {
            td.css("border", "3px blue solid");
          } else if (n % special_number === 0) {
            td.css("border", "3px red solid");
          }
          if ((n % width === 0) || (n % (width - 1) === 0) || (n % (width + 1) === 0)) {
            td.css("font-weight", "bold");
          }
          f = function(n) {
            return td.click(function() {
              special_number = n;
              width = max_prime_factor(n);
              return draw();
            });
          };
          f(n);
          tr.append(td);
        }
        td = $("<td> " + width + " * " + (i + 1) + " = " + ((i + 1) * width) + " </td>");
        td.css("border", "1px blue solid");
        _results.push(tr.append(td));
      }
      return _results;
    };
    $("#multi_wide").click(function() {
      width += 1;
      special_number = width;
      return draw();
    });
    $("#multi_narrow").click(function() {
      width -= 1;
      special_number = width;
      return draw();
    });
    $("#multi_plus_one").click(function() {
      special_number += 1;
      width = max_prime_factor(special_number);
      return draw();
    });
    return draw();
  };
  jQuery(document).ready(function() {
    TwelveTriangles();
    return MultiplicationTables();
  });
}).call(this);
