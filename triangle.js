

//start
 
const VERTEX_SHADER = `#version 300 es
   in vec2 a_position;
   in vec3 a_color;

   out vec3 color;

   void main() {
      // [0-1]
      vec2 zeroToTwo = a_position * 2.0;
      vec2 glCoordSpace = zeroToTwo - 1.0;

      gl_Position = vec4(glCoordSpace, 0, 1);

      color = a_color;
   }
`;

const FRAG_SHADER = `#version 300 es
   precision highp float;

   in vec3 color;

   out vec4 outColor;

   void main() {
      outColor = vec4(color, 1.0);
   }
`;

function start() {
   var canvas = document.getElementById('canvas');
   var gl = canvas.getContext('webgl2');
   
   var vertexShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertexShader, VERTEX_SHADER);
   gl.compileShader(vertexShader);
   var compiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
   if (!compiled) {
      let err = gl.getShaderInfoLog(vertexShader);
      throw new Error('Error compiling vertex shader: ' + err);
   }

   var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragShader, FRAG_SHADER);
   gl.compileShader(fragShader);
   var compiled = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
   if (!compiled) {
      let err = gl.getShaderInfoLog(fragShader);
      throw new Error('Error compiling frag shader:' + err);
   }

   var program = gl.createProgram();
   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragShader);
   gl.linkProgram(program);
   var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
   if (!linked) {
      let err = gl.getProgramInfoLog(program);
      throw new Error('Error linking program:' + err); 
   }

   var verticesDataBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, verticesDataBuffer);

var verticesData = new Float32Array([

   0.1, 1.0,    1.0, 0.0, 0.0,
   0.1, 0.0,    0.0, 1.0, 0.0,
   1.0, 0.0,    0.0, 0.0, 1.0,

]);

gl.bufferData(gl.ARRAY_BUFFER, verticesData, gl.STATIC_DRAW);

var a_position = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(a_position);
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 20, 0);

var a_color = gl.getAttribLocation(program, 'a_color');
gl.enableVertexAttribArray(a_color);
gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 20, 8);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
}