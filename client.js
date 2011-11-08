(function() {
  var Canvas, Linkage, MultiplicationTables, PythagFolding, PythagProof, TwelveTriangles;
  var __slice = Array.prototype.slice;
  Canvas = function(div, id, width, height) {
    var canvas, canvas_html, ctx;
    if (width == null) {
      width = 600;
    }
    if (height == null) {
      height = 300;
    }
    canvas_html = "<canvas id='" + id + "' width='" + width + "' height='" + height + "' style='border: 1px blue solid'>\n</canvas>";
    div.append(canvas_html);
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");
    return {
      clear: function() {
        return canvas.width = width;
      },
      segment: function(color, point1, point2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo.apply(ctx, point1);
        ctx.lineTo.apply(ctx, point2);
        ctx.stroke();
        return ctx.closePath();
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
  Linkage = function() {
    var a, b, canvas, dh, draw, dt, h, height, path1, path2, path3, path4, recording, rescale, width, x_offset, y_distort;
    width = 700;
    height = 450;
    x_offset = 0;
    y_distort = 0;
    rescale = function(point) {
      var x, y;
      x = point[0], y = point[1];
      x += x_offset;
      y *= y_distort;
      return [x * 20 + 100, height - y * 20 - 10];
    };
    canvas = Canvas($("#linkage"), "linkage_canvas", width, height);
    a = 17;
    b = 5;
    h = 0;
    dh = 0.02;
    dt = 50;
    recording = true;
    path1 = [];
    path2 = [];
    path3 = [];
    path4 = [];
    draw = function() {
      var A, B, C, D, E, Y, c, cos, d, e, i, path, rotate, segment, show, sin, _i, _len, _ref, _ref2;
      canvas.clear();
      c = Math.sqrt(a * a - b * b);
      d = Math.sqrt(c * c + h * h);
      e = Math.sqrt(b * b - h * h);
      i = Math.abs(h);
      A = [0, 0];
      B = [0, d - i];
      C = [e, d];
      D = [0, d + i];
      E = [-e, d];
      Y = [a + c / 2, c];
      cos = c / (d + i);
      sin = Math.sqrt(1 - cos * cos) * h / i;
      rotate = function(point) {
        var x, y;
        x = point[0], y = point[1];
        return [x * cos + y * sin, y * cos - x * sin];
      };
      segment = function(color, point1, point2) {
        return canvas.segment(color, rescale(point1), rescale(point2));
      };
      show = function() {
        segment("pink", A, B);
        segment("blue", E, D);
        segment("blue", D, C);
        segment("blue", C, B);
        segment("blue", B, E);
        segment("green", A, E);
        return segment("green", A, C);
      };
      x_offset = 0;
      y_distort = d / (d + i);
      A = rotate(A);
      B = rotate(B);
      C = rotate(C);
      D = rotate(D);
      E = rotate(E);
      x_offset = 12;
      y_distort = 1;
      if (recording) {
        path1.push(B);
        path2.push(D);
        path3.push(C);
        path4.push(E);
      }
      _ref = [path1, path2, path3, path4];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        for (i = 0, _ref2 = path.length - 1; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
          segment("pink", path[i], path[i + 1]);
        }
      }
      show();
      h += dh;
      if (h < -b || h > b) {
        if (h < 0) {
          recording = false;
        }
        dh *= -1;
      }
      return setTimeout(draw, dt);
    };
    return draw();
  };
  PythagFolding = function() {
    var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, a, b, blue, canvas, draw_poly, height, i, rescale, segment, x_offset, _results;
    x_offset = 50;
    height = 130;
    rescale = function(point) {
      var x, y;
      x = point[0], y = point[1];
      return [x * 10 + x_offset, height - y * 10 - 10];
    };
    canvas = Canvas($("#pythag_fold1"), "pythag_fold1_canvas", 400, height);
    a = 8.5;
    b = 11;
    A = [0, 0];
    B = [0, b];
    C = [a, b];
    D = [a, 0];
    draw_poly = function() {
      var color, point, points, scaled_points;
      color = arguments[0], points = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      scaled_points = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = points.length; _i < _len; _i++) {
          point = points[_i];
          _results.push(rescale(point));
        }
        return _results;
      })();
      return canvas.draw_polygon.apply(canvas, [color].concat(__slice.call(scaled_points)));
    };
    segment = function(color, point1, point2) {
      return canvas.segment(color, rescale(point1), rescale(point2));
    };
    draw_poly("lightblue", A, B, C, D);
    x_offset += 120;
    D = [a * (a * a - b * b) / (a * a + b * b), a * (2 * a * b) / (a * a + b * b)];
    draw_poly("lightblue", A, B, C);
    draw_poly("red", A, D, C);
    segment("black", A, C);
    x_offset += 100;
    D = [a, 0];
    draw_poly("lightblue", A, B, C);
    draw_poly("lightblue", A, C, D);
    segment("blue", A, C);
    x_offset = 50;
    canvas = Canvas($("#pythag_fold2"), "pythag_fold2_canvas", 800, height);
    draw_poly("lightblue", A, B, C);
    draw_poly("lightblue", A, C, D);
    segment("blue", A, C);
    x_offset += 100;
    E = [0, a];
    F = [a, a];
    draw_poly("lightblue", A, B, C, F);
    segment("blue", A, C);
    draw_poly("red", A, E, F);
    segment("black", A, F);
    segment("pink", E, F);
    x_offset += 100;
    G = [a, 2 * a - b];
    H = [0, 2 * a - b];
    K = [2 * a - b, 2 * a - b];
    draw_poly("lightblue", A, E, F);
    draw_poly("red", E, F, G, H);
    segment("black", E, F);
    segment("pink", H, K);
    x_offset += 100;
    L = [2 * a - b, a];
    draw_poly("lightblue", A, E, F);
    draw_poly("lightblue", E, F, K, H);
    draw_poly("red", L, K, F);
    segment("pink", H, K);
    segment("pink", L, K);
    segment("black", K, F);
    x_offset += 100;
    I = [3 * a - 2 * b, a];
    draw_poly("lightblue", A, H, K);
    draw_poly("lightblue", E, L, K, H);
    draw_poly("red", L, K, I);
    segment("pink", H, K);
    segment("pink", L, K);
    segment("pink", K, I);
    segment("black", K, L);
    x_offset += 100;
    J = [3 * a - 2 * b, 2 * a - b];
    draw_poly("lightblue", A, H, K);
    draw_poly("lightblue", E, I, K, H);
    draw_poly("red", J, K, I);
    segment("pink", H, K);
    segment("pink", I, J);
    segment("black", I, K);
    x_offset += 100;
    M = [2 * a - b, b];
    N = [a, 2 * a - b];
    O = [a, 3 * a - 2 * b];
    draw_poly("lightblue", A, B, C, D);
    segment("blue", A, C);
    segment("blue", A, F);
    segment("blue", E, F);
    segment("green", M, L);
    segment("blue", L, K);
    segment("green", K, N);
    segment("blue", I, K);
    segment("green", K, O);
    segment("green", I, M);
    segment("green", M, F);
    x_offset = 50;
    canvas = Canvas($("#pythag_fold3"), "pythag_fold3_canvas", 600, height);
    for (i = 1; i <= 2; i++) {
      draw_poly("lightgreen", A, B, C);
      draw_poly("yellow", A, C, D);
      segment("blue", A, C);
      x_offset += 100;
    }
    draw_poly("black", A, B, M, K, N, D);
    draw_poly("cyan", M, C, N, K);
    segment("blue", E, F);
    blue = "#AAAADD";
    _results = [];
    for (i = 1; i <= 2; i++) {
      x_offset += 100;
      D = [a, 0];
      P = [a * a / b, a];
      draw_poly(blue, A, P, F, D);
      draw_poly("lightblue", P, F, C);
      draw_poly("red", A, E, P);
      _results.push(draw_poly("pink", E, B, C, P));
    }
    return _results;
  };
  PythagProof = function() {
    var a, b, blue, c, canvas, draw_poly, points, redraw, rescale, triangles;
    canvas = Canvas($("#pythag_proof"), "pythag_canvas", 350, 350);
    rescale = function(point) {
      var x, y;
      x = point[0], y = point[1];
      y -= 4;
      return [x * 10 + 150, -y * 10 + 170];
    };
    draw_poly = function(poly, color, points) {
      var coords, i;
      coords = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = poly.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _results.push(points[poly.charAt(i)]);
        }
        return _results;
      })();
      return canvas.draw_polygon.apply(canvas, [color].concat(__slice.call(coords)));
    };
    a = 8.5;
    b = 2.5;
    c = (a * b) / (a + b);
    points = {
      A: function() {
        return [-a, 0];
      },
      B: function() {
        return [-a - b, 0];
      },
      C: function() {
        return [-a, b + c];
      },
      D: function() {
        return [-a, b];
      },
      E: function() {
        return [-a - b, b];
      },
      F: function() {
        return [-a - b, a + b];
      },
      G: function() {
        return [-a, a + b];
      },
      H: function() {
        return [0, a + b];
      },
      I: function() {
        return [a, a + b];
      },
      J: function() {
        return [a + b, a + b];
      },
      K: function() {
        return [a + b, a];
      },
      L: function() {
        return [a, a];
      },
      M: function() {
        return [b, a + b];
      },
      N: function() {
        return [a + b, 2 * a + b];
      },
      O: function() {
        return [2 * a + b, a];
      },
      P: function() {
        return [a + b, c];
      },
      Q: function() {
        return [a, 0];
      },
      R: function() {
        return [a, -a];
      },
      S: function() {
        return [0, c - a];
      },
      T: function() {
        return [0, -a];
      },
      U: function() {
        return [0, 0];
      },
      V: function() {
        return [b, a + b + c];
      },
      W: function() {
        return [0, b];
      },
      X: function() {
        return [-b, -a];
      },
      Y: function() {
        return [-b, 0];
      }
    };
    blue = "#AAAADD";
    triangles = [["EDAB", "cyan"], ["ECGF", "pink"], ["EDC", "lightblue"], ["AUG", "yellow"], ["UGH", "lightgreen"], ["STRQ", blue], ["UQS", "red"], ["HIQ", "lightgreen"], ["HMV", "lightblue"], ["VNJM", blue], ["NKO", "yellow"], ["OKP", "red"], ["LKPQ", "pink"], ["IJKL", "cyan"]];
    redraw = function() {
      var color, point, scaled_points, segment, triangle, vertex, vertices, _i, _len;
      canvas.clear();
      scaled_points = {};
      for (vertex in points) {
        point = points[vertex];
        scaled_points[vertex] = rescale(point());
      }
      segment = function(segment, color) {
        var point1, point2;
        point1 = scaled_points[segment.charAt(0)];
        point2 = scaled_points[segment.charAt(1)];
        return canvas.segment(color, point1, point2);
      };
      for (_i = 0, _len = triangles.length; _i < _len; _i++) {
        triangle = triangles[_i];
        vertices = triangle[0], color = triangle[1];
        draw_poly(vertices, color, scaled_points);
      }
      segment("EH", "black");
      segment("HQ", "black");
      segment("HN", "black");
      segment("NO", "black");
      segment("OQ", "black");
      segment("GU", "black");
      segment("BU", "blue");
      segment("UH", "blue");
      segment("HF", "blue");
      segment("FB", "blue");
      segment("QI", "blue");
      segment("NK", "blue");
      segment("ED", "orange");
      segment("DW", "green");
      segment("UQ", "green");
      segment("AG", "blue");
      segment("XY", "green");
      segment("XT", "orange");
      segment("XQ", "black");
      segment("TR", "green");
      segment("QR", "green");
      return segment("UT", "green");
    };
    return redraw();
  };
  TwelveTriangles = function() {
    var canvas, draw, draw_triangle, height, rescale, skew;
    canvas = Canvas($("#twelve_triangles"), "twelve_triangles_canvas");
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
    $("body").css("width", 800);
    Linkage();
    PythagProof();
    PythagFolding();
    TwelveTriangles();
    return MultiplicationTables();
  });
}).call(this);
