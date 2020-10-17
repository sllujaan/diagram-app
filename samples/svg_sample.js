const { Component, PropTypes } = React
const { render } = ReactDOM

/**
 * Pathstring Builder
 */
function buildPathstring(points) {
  return points.reduce(
    (acc, point, i) => `${ acc }${ point.code }${ buildSegment[point.code](point, i > 0 ? points[i - 1] : defaultPoint) }`,
    ""
  ).replace(/\s+/g, " ")
}

function r(n, precision = 3) {
  const coef = Math.pow(10, precision)
  return Math.round(n * coef) / coef
}

const buildSegment = {
  m({ x, y, parameters }, prev) {
    return `${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  M({ x, y, parameters }, prev) {
    return `${ r(x) } ${ r(y) }`
  },

  l({ x, y, parameters }, prev) {
    return `${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  L({ x, y, parameters }, prev) {
    return `${ r(x) } ${ r(y) }`
  },

  h({ x, y, parameters }, prev) {
    return `${ r(x - prev.x) }`
  },

  H({ x, y, parameters }, prev) {
    return `${ r(x) }`
  },

  v({ x, y, parameters }, prev) {
    return `${ r(y - prev.y) }`
  },

  V({ x, y, parameters }, prev) {
    return `${ r(y) }`
  },

  q({ x, y, parameters }, prev) {
    return `${ r(parameters.x1 - prev.x) } ${ r(parameters.y1 - prev.y) } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  Q({ x, y, parameters }, prev) {
    return `${ r(parameters.x1) } ${ r(parameters.y1) } ${ r(x) } ${ r(y) }`
  },

  t({ x, y, parameters }, prev) {
    return `${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  T({ x, y, parameters }, prev) {
    return `${ r(x) } ${ r(y) }`
  },

  c({ x, y, parameters }, prev) {
    return `${ r(parameters.x1 - prev.x) } ${ r(parameters.y1 - prev.y) } ${ r(parameters.x2 - prev.x) } ${ r(parameters.y2 - prev.y) } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  C({ x, y, parameters }, prev) {
    return `${ r(parameters.x1) } ${ r(parameters.y1) } ${ r(parameters.x2) } ${ r(parameters.y2) } ${ r(x) } ${ r(y) }`
  },

  s({ x, y, parameters }, prev) {
    return `${ r(parameters.x2 - prev.x) } ${ r(parameters.y2 - prev.y) } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  S({ x, y, parameters }, prev) {
    return `${ r(parameters.x2) } ${ r(parameters.y2) } ${ r(x) } ${ r(y) }`
  },

  a({ x, y, parameters }, prev) {
    return `${ r(parameters.rx) } ${ r(parameters.ry) } ${ r(parameters.rotation) } ${ parameters.large } ${ parameters.sweep } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  A({ x, y, parameters }, prev) {
    return `${ r(parameters.rx) } ${ r(parameters.ry) } ${ r(parameters.rotation) } ${ parameters.large } ${ parameters.sweep } ${ r(x) } ${ r(y) }`
  },

  z() {
    return ""
  },

  Z() {
    return ""
  },
}

/**
 * SVG Path Parser
 */
class Point {
  constructor(code, x, y, parameters = {}) {
    this.code = code
    this.x = x
    this.y = y
    this.parameters = parameters
  }
  
  toCubic(prev) {
    if (this.isL() || this.isH() || this.isV()) {
      return lineToCubic(prev, this)
    }

    if (this.isQ() || this.isT()) {
      return quadraticToCubic(prev, this)
    }

    if (this.isA()) {
      return arcToCubic(prev, this)
    }

    return this
  }
  
  isRelative() {
    return this.code.toLowerCase() === this.code
  }

  isM() {
    return this.code.toLowerCase() === "m"
  }

  isL() {
    return this.code.toLowerCase() === "l"
  }

  isH() {
    return this.code.toLowerCase() === "h"
  }

  isV() {
    return this.code.toLowerCase() === "v"
  }

  isQ() {
    return this.code.toLowerCase() === "q"
  }

  isT() {
    return this.code.toLowerCase() === "t"
  }

  isC() {
    return this.code.toLowerCase() === "c"
  }

  isS() {
    return this.code.toLowerCase() === "s"
  }

  isA() {
    return this.code.toLowerCase() === "a"
  }

  isZ() {
    return this.code.toLowerCase() === "z"
  }
}

const defaultPoint = new Point(null, 0, 0)

const commands = {
  m(dx, dy, prev = defaultPoint) {
    return new Point("m", prev.x + dx, prev.y + dy)
  },

  M(x, y, prev = defaultPoint) {
    return new Point("M", x, y)
  },

  l(dx, dy, prev = defaultPoint) {
    return new Point("l", prev.x + dx, prev.y + dy)
  },

  L(x, y, prev = defaultPoint) {
    return new Point("L", x, y)
  },

  h(dx, prev = defaultPoint) {
    return new Point("h", prev.x + dx, prev.y)
  },

  H(x, prev = defaultPoint) {
    return new Point("H", x, prev.y)
  },

  v(dy, prev = defaultPoint) {
    return new Point("v", prev.x, prev.y + dy)
  },

  V(y, prev = defaultPoint) {
    return new Point("V", prev.x, y)
  },

  q(dx1, dy1, dx, dy, prev = defaultPoint) {
    return new Point("q", prev.x + dx, prev.y + dy, {
      x1: prev.x + dx1,
      y1: prev.y + dy1,
    })
  },

  Q(x1, y1, x, y, prev = defaultPoint) {
    return new Point("Q", x, y, {
      x1,
      y1,
    })
  },

  t(dx, dy, prev = defaultPoint) {
    let parameters = {
      x1: prev.x,
      y1: prev.y,
    }

    if (prev.isQ() || prev.isT()) {
      parameters = {
        x1: 2 * prev.x - prev.parameters.x1,
        y1: 2 * prev.y - prev.parameters.y1,
      }
    }

    return new Point("t", prev.x + dx, prev.y + dy, parameters)
  },

  T(x, y, prev = defaultPoint) {
    let parameters = {
      x1: prev.x,
      y1: prev.y,
    }

    if (prev.isQ() || prev.isT()) {
      parameters = {
        x1: 2 * prev.x - prev.parameters.x1,
        y1: 2 * prev.y - prev.parameters.y1,
      }
    }

    return new Point("T", x, y, parameters)
  },

  c(dx1, dy1, dx2, dy2, dx, dy, prev = defaultPoint) {
    return new Point("c", prev.x + dx, prev.y + dy, {
      x1: prev.x + dx1,
      y1: prev.y + dy1,
      x2: prev.x + dx2,
      y2: prev.y + dy2,
    })
  },

  C(x1, y1, x2, y2, x, y, prev = defaultPoint) {
    return new Point("C", x, y, {
      x1,
      y1,
      x2,
      y2,
    })
  },

  s(dx2, dy2, dx, dy, prev = defaultPoint) {
    let parameters = {
      x1: prev.x,
      y1: prev.y,
      x2: prev.x + dx2,
      y2: prev.y + dy2,
    }

    if (prev.isC() || prev.isS()) {
      parameters = {
        ...parameters,
        x1: 2 * prev.x - prev.parameters.x2,
        y1: 2 * prev.y - prev.parameters.y2,
      }
    }

    return new Point("s", prev.x + dx, prev.y + dy, parameters)
  },

  S(x2, y2, x, y, prev = defaultPoint) {
    let parameters = {
      x1: prev.x,
      y1: prev.y,
      x2,
      y2,
    }

    if (prev.isC() || prev.isS()) {
      parameters = {
        ...parameters,
        x1: 2 * prev.x - prev.parameters.x2,
        y1: 2 * prev.y - prev.parameters.y2,
      }
    }

    return new Point("S", x, y, parameters)
  },

  a(rx, ry, rotation, large, sweep, dx, dy, prev = defaultPoint) {
    return new Point("a", prev.x + dx, prev.y + dy, {
      rx,
      ry,
      rotation,
      large,
      sweep,
    })
  },

  A(rx, ry, rotation, large, sweep, x, y, prev = defaultPoint) {
    return new Point("A", x, y, {
      rx,
      ry,
      rotation,
      large,
      sweep,
    })
  },

  z(firstPoint = defaultPoint) {
    return new Point("z", firstPoint.x, firstPoint.y)
  },

  Z(firstPoint = defaultPoint) {
    return new Point("Z", firstPoint.x, firstPoint.y)
  },
}

function arcToCubic(prev, point, center = null) {
  let partial = []
  let cx, cy, f1, f2

  let x1 = prev.x
  let y1 = prev.y
  let x2 = point.x
  let y2 = point.y
  let rx = point.parameters.rx
  let ry = point.parameters.ry

  const pi2_3 = 2 * Math.PI / 3
  const angle = Math.PI / 180 * point.parameters.rotation

  if (center) {
    cx = center[0]
    cy = center[1]
    f1 = center[2]
    f2 = center[3]
  } else {
    const _prev = rotate([prev], -angle)[0]
    const _point = rotate([point], -angle)[0]

    x1 = _prev.x
    y1 = _prev.y
    x2 = _point.x
    y2 = _point.y

    const x = (x1 - x2) / 2
    const y = (y1 - y2) / 2
    const sqX = Math.pow(x, 2)
    const sqY = Math.pow(y, 2)

    let sqRx = Math.pow(rx, 2)
    let sqRy = Math.pow(ry, 2)
    let ellipse = sqX / sqRx + sqY / sqRy

    if (ellipse > 1) {
      ellipse = Math.sqrt(ellipse)
      rx = ellipse * rx
      ry = ellipse * ry
    }

    sqRx = Math.pow(rx, 2)
    sqRy = Math.pow(ry, 2)

    const sign = point.parameters.large === point.parameters.sweep ? -1 : 1
    const k = sign * Math.sqrt(Math.abs((sqRx * sqRy - sqRx * sqY - sqRy * sqX) / (sqRx * sqY + sqRy * sqX)))

    cx = k * rx * y / ry + (x1 + x2) / 2
    cy = k * -ry * x / rx + (y1 + y2) / 2

    f1 = Math.asin((y1 - cy) / ry)
    f2 = Math.asin((y2 - cy) / ry)

    if (x1 < cx) {
      f1 = Math.PI - f1
    }

    if (f1 < 0) {
      f1 += 2 * Math.PI
    }

    if (x2 < cx) {
      f2 = Math.PI - f2
    }

    if (f2 < 0) {
      f2 += 2 * Math.PI
    }

    if (point.parameters.sweep === 1 && f1 > f2) {
      f1 -= 2 * Math.PI
    }

    if (point.parameters.sweep === 0 && f2 > f1) {
      f2 -= 2 * Math.PI
    }
  }

  if (Math.abs(f2 - f1) > pi2_3) {
    const _f2 = f2
    const _point = new Point(point.code, x2, y2, point.parameters)

    f2 = f1 + pi2_3 * (point.parameters.sweep === 1 && f2 > f1 ? 1 : -1)
    x2 = cx + rx * Math.cos(f2)
    y2 = cy + ry * Math.sin(f2)

    const _prev = new Point(prev.code, x2, y2, prev.parameters)

    partial = arcToCubic(_prev, _point, [cx, cy, f2, _f2])
  }

  const t = Math.tan((f2 - f1) / 4)
  const hx = 4 / 3 * rx * t
  const hy = 4 / 3 * ry * t

  const p1 = [x1, y1]
  const p2 = [x1 + hx * Math.sin(f1), y1 - hy * Math.cos(f1)]
  const p3 = [x2 + hx * Math.sin(f2), y2 - hy * Math.cos(f2)]
  const p4 = [x2, y2]

  p2[0] = 2 * p1[0] - p2[0]
  p2[1] = 2 * p1[1] - p2[1]

  const cubic = point.isRelative() ?
    commands.c(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]) :
    commands.C(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1])

  if (center) {
    return [cubic, ...partial]
  }

  return rotate([cubic, ...partial], angle)
}

function lineToCubic(prev, point) {
  return point.isRelative() ?
    commands.c(prev.x, prev.y, point.x, point.y, point.x, point.y) :
    commands.C(prev.x, prev.y, point.x, point.y, point.x, point.y)
}

function quadraticToCubic(prev, point) {
  const x1 = (1 / 3 * prev.x) + (2 / 3 * point.parameters.x1)
  const y1 = (1 / 3 * prev.y) + (2 / 3 * point.parameters.y1)
  const x2 = (1 / 3 * point.x) + (2 / 3 * point.parameters.x1)
  const y2 = (1 / 3 * point.y) + (2 / 3 * point.parameters.y1)

  return point.isRelative() ?
    commands.c(x1, y1, x2, y2, point.x, point.y) :
    commands.C(x1, y1, x2, y2, point.x, point.y)
}

function parsePathstring(d) {
  return buildPointList(getSegments(d))
}

function getSegments(d) {
  const cleanArray = (str) => str.trim().length > 0
  const clean = (str) => {
    str = str.trim()
    return isNaN(str) ? str : parseFloat(str)
  }

  return d
    .replace(/[^mlhvqtcsaze\d\s,.-]/gi, "")
    .split(/([mlhvqtcsaz][e\d\s,.-]*)/i)
    .filter(cleanArray)
    .map(
      (segment) => segment
        .replace(/[\s,]+/g, " ")
        .split(/([mlhvqtcsaz]|-*[e\d.-]+)/i)
        .filter(cleanArray)
        .map(clean)
    )
}

function buildPointList(segments) {
  let firstPoint

  return segments.reduce(
    (acc, [code, ...parameters]) => {
      let p

      if (typeof (p = commands[code]) !== "undefined") {
        let pointList, prev

        if (acc.length > 0) {
          prev = acc[acc.length - 1]
        }

        if (prev && prev.isM()) {
          firstPoint = prev
        }

        if (p.length > 0) {
          pointList = chunks(parameters, p.length).map(
            (chunk) => prev = p(...chunk, prev)
          )
        } else {
          pointList = [p(firstPoint)]
        }

        return [...acc, ...pointList]
      }
    },
    []
  )
}

function chunks(array, n) {
  const tmp = []

  for (let i = 0, j = array.length ; i < j ; i += n) {
    const chunk = array.slice(i, i + n)

    if (chunk.length === n) {
      tmp.push(chunk)
    }
  }

  return tmp
}

/**
 * Matrix transform
 */
function matrix(path, a) {  
  let lastComputedPoint = defaultPoint

  return path.map((p, i) => {
    const prev = i > 0 && path[i - 1]
    const px = typeof p.x === "number" ? p.x : prev.x
    const py = typeof p.y === "number" ? p.y : prev.y
    const px1 = typeof p.parameters.x1 === "number" && p.parameters.x1
    const py1 = typeof p.parameters.y1 === "number" && p.parameters.y1
    const px2 = typeof p.parameters.x2 === "number" && p.parameters.x2
    const py2 = typeof p.parameters.y2 === "number" && p.parameters.y2

    // compute position
    const [x, y] = multiply3x1(a, [px, py, 1])

    // get point code
    let code = p.code

    if (
      (p.isH() && y !== lastComputedPoint.y)
      || (p.isV() && x !== lastComputedPoint.x)
    ) {
      code = p.isRelative() ? "l" : "L"
    }

    // compute parameters
    let x1, y1, x2, y2

    if (px1 !== false && py1 !== false) {
      [x1, y1] = multiply3x1(a, [px1, py1, 1])
    }

    if (px2 !== false && py2 !== false) {
      [x2, y2] = multiply3x1(a, [px2, py2, 1])
    }

    const parameters = {
      ...p.parameters,
      ...(typeof x1 !== "undefined" && { x1 }),
      ...(typeof y1 !== "undefined" && { y1 }),
      ...(typeof x2 !== "undefined" && { x2 }),
      ...(typeof y2 !== "undefined" && { y2 }),
    }

    // this point will be used to know if the next H or V
    // should be converted into L
    lastComputedPoint = new Point(code, x, y, parameters)

    return lastComputedPoint
  })
}

function multiply3x1(a, b) {
  const a00 = a[0 * 3 + 0]
  const a01 = a[0 * 3 + 1]
  const a02 = a[0 * 3 + 2]
  const a10 = a[1 * 3 + 0]
  const a11 = a[1 * 3 + 1]
  const a12 = a[1 * 3 + 2]
  const a20 = a[2 * 3 + 0]
  const a21 = a[2 * 3 + 1]
  const a22 = a[2 * 3 + 2]
  const b0 = b[0]
  const b1 = b[1]
  const b2 = b[2]

  return [
    a00 * b0 + a01 * b1 + a02 * b2,
    a10 * b0 + a11 * b1 + a12 * b2,
    a20 * b0 + a21 * b1 + a22 * b2,
  ]
}

/**
 * Transforms
 */
function translate(path, dx, dy) {
  return matrix(path, [
    1, 0, dx,
    0, 1, dy,
    0, 0, 1,
  ])
}

function skew(path, thetaX, thetaY) {
  return matrix(path, [
    1, Math.tan(thetaX), 0,
    Math.tan(thetaY), 1, 0,
    0, 0, 1,
  ])
}

function scale(path, sx, sy) {
  return matrix(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ])
}

function rotate(path, theta) {
  return matrix(path, [
    Math.cos(theta), -Math.sin(theta), 0,
    Math.sin(theta), Math.cos(theta), 0,
    0, 0, 1,
  ])
}

function cssMatrix(path, [v1, v2, v3, v4, v5, v6]) {
  return matrix(path, [
    v1, v3, v5,
    v2, v4, v6,
    0, 0, 1,
  ])
}

/**
 * Compute Bounding Box
 */
function toCubics(path) {
  return path.reduce(
    (acc, point, i) => {
      const cubic = point.toCubic(i > 0 && path[i - 1])

      if (Array.isArray(cubic)) {
        return [...acc, ...cubic]
      }

      return [...acc, cubic]
    },
    []
  )
}

function boundingBox(_path) {
  if (_path.length === 0) {
    return {
      xMin: 0,
      yMin: 0,
      xMax: 0,
      yMax: 0,
      width: 0,
      height: 0,
    }
  }
  
  const path = toCubics(_path)
  const x = []
  const y = []

  for (let i = 0 ; i < path.length ; i++) {
    const point = path[i]
    const prev = i > 0 && path[i - 1]

    if (point.isM() || point.isZ()) {
      x.push(point.x)
      y.push(point.y)
    } else {
      const { xMin, xMax, yMin, yMax } = cubicBoundingBox(prev, point)

      x.push(xMin)
      x.push(xMax)
      y.push(yMin)
      y.push(yMax)
    }
  }

  const xMin = Math.min(...x)
  const xMax = Math.max(...x)
  const yMin = Math.min(...y)
  const yMax = Math.max(...y)

  return {
    xMin,
    xMax,
    yMin,
    yMax,
    width: xMax - xMin,
    height: yMax - yMin,
  }
}

function cubicBoundingBox(prev, point) {
  const p0 = new Point(null, prev.x, prev.y)
  const p1 = new Point(null, point.parameters.x1, point.parameters.y1)
  const p2 = new Point(null, point.parameters.x2, point.parameters.y2)
  const p3 = new Point(null, point.x, point.y)

  const x = getMinMax(p0.x, p1.x, p2.x, p3.x)
  const y = getMinMax(p0.y, p1.y, p2.y, p3.y)

  return {
    xMin: x.min,
    xMax: x.max,
    yMin: y.min,
    yMax: y.max,
  }
}

function getMinMax(p0, p1, p2, p3) {
  const a = 3 * p3 - 9 * p2 + 9 * p1 - 3 * p0
  const b = 6 * p0 - 12 * p1 + 6 * p2
  const c = 3 * p1 - 3 * p0
  const d = Math.pow(b, 2) - 4 * a * c

  let min = p0
  let max = p0

  if (p3 < min) {
    min = p3
  }

  if (p3 > max) {
    max = p3
  }

  if (d >= 0) {
    const t1 = (-b + Math.sqrt(d)) / (2 * a)

    if (t1 > 0 && t1 < 1) {
      const p = cubic(p0, p1, p2, p3, t1)

      if (p < min) {
        min = p
      }

      if (p > max) {
        max = p
      }
    }

    const t2 = (-b - Math.sqrt(d)) / (2 * a)

    if (t2 > 0 && t2 < 1) {
      const p = cubic(p0, p1, p2, p3, t2)

      if (p < min) {
        min = p
      }

      if (p > max) {
        max = p
      }
    }
  }

  return { min, max }
}

function cubic(p0, p1, p2, p3, t) {
  return p0 * Math.pow(1 - t, 3) + p1 * 3 * t * Math.pow(1 - t, 2) + p2 * 3 * Math.pow(t, 2) * (1 - t) + p3 * Math.pow(t, 3)
}
  
function relToAbs(path, n) {
  const bbox = boundingBox(path)

  return {
    x: bbox.xMin + bbox.width * n / 100,
    y: bbox.yMin + bbox.height * n / 100,
  }
}

function parsePercent(str) {
  let n = str
  
  if (isNaN(n)) {
    n = n.replace("%", "")
  }
  
  return parseFloat(isNaN(n) ? 0 : n)
}

function parseDeg(str) {
  let n = str
  
  if (isNaN(n)) {
    n = n.replace("deg", "")
  }
  
  return parseFloat(isNaN(n) ? 0 : n) * Math.PI / 180
}

const defaultParameters = {
  "setOrigin": [0, 0],
  "translate": [0, 0],
  "scale": [1, 1],
  "skew": ["0deg", "0deg"],
  "rotate": ["0deg"],
  "matrix": [1, 0, 0, 1, 0, 0],
}

let key = 0

class Root extends Component {
  constructor() {
    super()
    this.origin = { x: 0, y: 0 }
    this.transforms = [
      { name: "setOrigin", parameters: ["center", "center"] },
      { name: "rotate", parameters: ["15deg"] },
      { name: "scale", parameters: [.75, .75] },
      { name: "skew", parameters: ["10deg", "5deg"] },
      { name: "translate", parameters: [10, -20] },
    ]
  }

  state = {
    d: "M255.806943,87.0866439 C255.748337,86.7763743 255.696625,86.4661047 255.613887,86.1627299 C255.562175,85.9800156 255.500121,85.8076436 255.441515,85.6283767 C255.355329,85.3594764 255.265695,85.0905761 255.158825,84.8285707 C255.082981,84.6458563 254.996795,84.4700369 254.914056,84.2942175 C254.796843,84.0460018 254.676183,83.8012335 254.538285,83.5633602 C254.441757,83.3875407 254.331439,83.2220636 254.224568,83.0531391 C254.076328,82.825608 253.924641,82.6015244 253.759164,82.3843357 C253.638504,82.222306 253.514396,82.0671712 253.383393,81.9120364 C253.211021,81.70519 253.024859,81.5086859 252.838698,81.3156293 C252.693905,81.1708368 252.549113,81.0260443 252.397425,80.8846993 C252.197474,80.701985 251.990627,80.529613 251.773439,80.3641359 C251.607961,80.2365806 251.445932,80.1055779 251.27356,79.9883649 C251.211506,79.9435482 251.156347,79.8918366 251.090845,79.8504673 L134.098521,1.8486897 C130.406313,-0.616229901 125.590239,-0.616229901 121.898031,1.8486897 L4.89881225,79.8470198 C4.83331089,79.8883891 4.78159929,79.9401007 4.71609793,79.9849174 C4.54372593,80.1055779 4.38169625,80.2331331 4.21621913,80.3606884 C4.00247785,80.529613 3.79218401,80.701985 3.59223249,80.8778044 C3.44054513,81.015702 3.29575265,81.1604945 3.15440761,81.3087344 C2.96135097,81.5017911 2.78208409,81.6982951 2.60626464,81.9051415 C2.47526192,82.0602763 2.35115408,82.2154111 2.23049368,82.3877831 C2.06501656,82.6049719 1.9133292,82.825608 1.76508928,83.0565865 C1.65821864,83.2255111 1.551348,83.3909882 1.45137224,83.5668076 C1.31347464,83.804681 1.19281424,84.0494492 1.07904872,84.29077 C0.996310162,84.4665895 0.906676722,84.6458563 0.834280482,84.8251232 C0.727409841,85.0871287 0.634328961,85.356029 0.548142961,85.6249293 C0.489536481,85.8041962 0.427482561,85.9800156 0.379218401,86.1420453 C0.299927281,86.44542 0.2413208,86.7522422 0.18616176,87.0659592 C0.1551348,87.2245415 0.11721296,87.3796763 0.0965283202,87.5417059 C0.0344744001,88.0174527 2.84217094e-14,88.4931994 2.84217094e-14,88.9792884 L2.84217094e-14,166.994856 C2.84217094e-14,167.477497 0.0344744001,167.960139 0.1034232,168.432438 C0.12755528,168.60481 0.172372,168.742708 0.2068464,168.908185 C0.26200544,169.218455 0.310269601,169.528724 0.413692801,169.838994 C0.461956961,170.011366 0.517116001,170.183738 0.586064801,170.373347 C0.672250801,170.649142 0.758436801,170.924937 0.861860002,171.176601 C0.934256242,171.348973 1.034232,171.521345 1.1031808,171.693717 C1.21694632,171.935037 1.3445016,172.176358 1.4823992,172.428021 C1.57892752,172.600393 1.6892456,172.772765 1.7926688,172.931347 C1.94090872,173.172668 2.1029384,173.379515 2.2753104,173.586361 C2.3959708,173.758733 2.5166312,173.896631 2.6545288,174.062108 C2.83034825,174.268954 2.99927281,174.475801 3.20611921,174.658515 C3.34746425,174.796413 3.48191441,174.968785 3.65428641,175.072208 C3.85423793,175.24458 4.06797921,175.416952 4.27482561,175.596219 C4.44030273,175.734116 4.61956961,175.837539 4.75746721,175.97199 C4.82296857,176.006464 4.86089041,176.075413 4.92983921,176.10644 L121.898031,254.146139 C123.745859,255.387218 125.862587,256.007757 128,255.997414 C130.137413,255.987072 132.254141,255.376875 134.101969,254.146139 L251.101188,176.147809 C251.166689,176.10644 251.221848,176.058176 251.283902,176.013359 C251.456274,175.892698 251.618304,175.765143 251.783781,175.637588 C251.997522,175.468663 252.207816,175.292844 252.407768,175.113577 C252.559455,174.979127 252.704247,174.830887 252.84904,174.686094 C253.038649,174.493038 253.221363,174.296534 253.393735,174.089687 C253.524738,173.934553 253.648846,173.779418 253.769506,173.613941 C253.934983,173.396752 254.086671,173.172668 254.234911,172.945137 C254.341781,172.77966 254.448652,172.610736 254.548628,172.441811 C254.686525,172.20049 254.807186,171.955722 254.924399,171.707506 C255.007137,171.531687 255.093323,171.355867 255.169167,171.176601 C255.276038,170.911148 255.365671,170.642247 255.451857,170.373347 C255.510464,170.19408 255.572517,170.018261 255.624229,169.838994 C255.70352,169.535619 255.758679,169.225349 255.817286,168.91508 C255.844865,168.756498 255.886234,168.601363 255.903472,168.439333 C255.965526,167.963586 256,167.48784 256,167.001751 L256,88.9999731 C256,88.513884 255.962078,88.0381373 255.903472,87.5623906 C255.875892,87.393466 255.824181,87.2555684 255.789706,87.0866439 L255.806943,87.0866439 Z M127.996553,154.022139 L89.0921921,128.000862 L127.996553,101.976137 L166.90436,128.000862 L127.996553,154.022139 L127.996553,154.022139 Z M116.999219,82.8669773 L69.3073339,114.76614 L30.8097713,89.0137628 L116.999219,31.5552802 L116.999219,82.8669773 L116.999219,82.8669773 Z M49.5224757,127.997414 L22.0050096,146.403297 L22.0050096,109.591532 L49.5224757,127.997414 L49.5224757,127.997414 Z M69.3073339,141.242479 L116.999219,173.138194 L116.999219,224.449891 L30.8097713,166.984513 L69.3073339,141.235584 L69.3073339,141.242479 Z M138.997334,173.131299 L186.689219,141.235584 L225.190229,166.984513 L138.997334,224.442996 L138.997334,173.131299 L138.997334,173.131299 Z M206.474077,128.004309 L233.99499,109.59498 L233.99499,146.410191 L206.474077,127.997414 L206.474077,128.004309 Z M186.689219,114.76614 L138.997334,82.8704247 L138.997334,31.5552802 L225.190229,89.0137628 L186.689219,114.76614 L186.689219,114.76614 Z",
    transforms: [],
  };
  
  componentDidMount() {
    this.update()
  }
  
  update() {
    this.setState({ transforms: this.transforms })
  }

  setOrigin(path, x, y) {
    if (isNaN(x)) {
      switch (x) {
        case "left": x = relToAbs(path, 0).x
        break
        case "center": x = relToAbs(path, 50).x
        break
        case "right": x = relToAbs(path, 100).x
        break
        default: x = relToAbs(path, parsePercent(x)).x
        break
      }
    }

    if (isNaN(y)) {
      switch (y) {
        case "top": y = relToAbs(path, 0).y
        break
        case "center": y = relToAbs(path, 50).y
        break
        case "bottom": y = relToAbs(path, 100).y
        break
        default: y = relToAbs(path, parsePercent(y)).y
        break
      }
    }

    this.origin = { x, y }
  }

  computeOrigin(path) {
    return translate(path, -this.origin.x, -this.origin.y)
  }

  resetOrigin(path) {
    return translate(path, this.origin.x, this.origin.y)
  }
  
  getPoints() {
    return parsePathstring(this.state.d)
  }
  
  getTransformedPoints() {
    this.origin = { x: 0, y: 0 }
    
    return this.state.transforms.reduce((acc, t) => {
      if (t.parameters.length > 0) {
        if (t.name === "setOrigin") {
          this.setOrigin(acc, ...t.parameters)
        } else {
          acc = this.computeOrigin(acc)
          switch (t.name) {
            case "translate": acc = translate(acc, ...t.parameters.map((p) => parseFloat(p)))
            break
            case "scale": acc = scale(acc, ...t.parameters.map((p) => parseFloat(p)))
            break
            case "skew": acc = skew(acc, ...t.parameters.map((p) => parseDeg(p)))
            break
            case "rotate": acc = rotate(acc, ...t.parameters.map((p) => parseDeg(p)))
            break
            case "matrix": acc = cssMatrix(acc, t.parameters.map((p) => parseFloat(p)))
            break
          }
          acc = this.resetOrigin(acc)
        }
      }
      
      return acc
    }, this.getPoints())
  }

  getPathstring() {    
    return buildPathstring(this.getTransformedPoints())
  }
  
  handleTransformAdd = (e) => {
    const name = e.target.value

    if (name !== "") {      
      this.transforms = [
        ...this.transforms,
        { name, parameters: defaultParameters[name] },
      ]
      
      this.update()
      
      e.target.value = ""
    }
  };
  
  handleTransformRemove = (e, i) => {
    this.transforms = [
      ...this.transforms.slice(0, i),
      ...this.transforms.slice(i + 1, this.transforms.length),
    ]
    
    this.update()
  };
  
  handleParamChange = (i, e, n) => {
    const transform = {
      ...this.transforms[i],
      parameters: [
        ...this.transforms[i].parameters.slice(0, n),
        e.target.value,
        ...this.transforms[i].parameters.slice(n + 1, this.transforms[i].parameters.length),
      ],
    }

    this.transforms = [
      ...this.transforms.slice(0, i),
      transform,
      ...this.transforms.slice(i + 1, this.transforms.length),
    ]
  };
  
  handlePathChange = (e) => {
    this.setState({ d: e.target.value })
  };
  
  handleUpdateClick = (e) => {
    this.update()
  };

  render() {
    const bbox = boundingBox(this.getPoints())
    const width = bbox.xMax >= 0 ? bbox.xMax : 0
    const height = bbox.yMax >= 0 ? bbox.yMax : 0
    
    return (
      <div className="ad-Root">
        <h1 className="ad-Title">SVG Path Transformer</h1>
        <div className="ad-App">
          <div className="ad-Preview">
            <div className="ad-Canvas">
              <svg
                className="ad-SVG"
                width={ width }
                height={ height }
                viewBox={ `0 0 ${ width } ${ height }` }>
                <path
                  className="ad-Path  ad-Path--input"
                  d={ this.state.d } />
                <path
                  className="ad-Path  ad-Path--output"
                  d={ this.getPathstring() } />
              </svg>
            </div>
            <div className="ad-Pathstrings">
              <Textarea
                label="Input"
                value={ this.state.d }
                onChange={ this.handlePathChange } />
              <Textarea
                label="Output"
                value={ this.getPathstring() }
                readOnly={ true }
                onClick={ (e) => e.target.select() } />
            </div>
          </div>
          <div className="ad-Transforms">
            {
              this.state.transforms.map((t, i) => (
                <Transform
                  key={ ++key }
                  name={ t.name }
                  parameters={ t.parameters }
                  onParamChange={ (e, n) => this.handleParamChange(i, e, n) }
                  onTransformRemove={ (e) => this.handleTransformRemove(e, i) } />
              ))
            }
            <div className="ad-Transforms-add">
              <select
                className="ad-Transforms-select"
                onChange={ this.handleTransformAdd }>
                <option value="">Add a transform...</option>
                <option value="setOrigin">setOrigin(x, y)</option>
                <option value="translate">translate(x, y)</option>
                <option value="scale">scale(x, y)</option>
                <option value="skew">skew(x, y)</option>
                <option value="rotate">rotate(deg)</option>
                <option value="matrix">matrix(...)</option>
              </select>
              <button
                className="ad-Button"
                onClick={ this.handleUpdateClick }>
                Update
              </button>
            </div>
            <div className="ad-Foot">
              <a href="https://twitter.com/a_dugois">Follow me</a> on Twitter!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Textarea = ({ label, ...props }) => (
  <div className="ad-Textarea">
    { label && (
      <label className="ad-Textarea-label">{ label }</label>
    ) }
    <textarea
      className="ad-Textarea-input"
      { ...props } />
  </div>
)

const Transform = ({ name, parameters, onParamChange, onTransformRemove }) => (
  <div className="ad-Transform">
    <span className="ad-Transform-fn">{ name }(</span>
    <span className="ad-Transform-params">
      {
        parameters.map((p, n) => (
          <span
            key={ ++key }
            className="ad-Transform-param">
            <input
              className="ad-Transform-input"
              defaultValue={ p }
              onChange={ (e) => onParamChange(e, n) } />
            { n < parameters.length - 1 && ", " }
          </span>
        ))
      }
    </span>
    <span className="ad-Transform-fn">)</span>
    <button
      className="ad-Transform-rm"
      onClick={ onTransformRemove }>
      Remove
    </button>
  </div>
)

render(<Root />, document.querySelector("#root"))