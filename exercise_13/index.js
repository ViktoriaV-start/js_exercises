// Задача на классы и наследование:
// создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра.
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.

'use strict';

const PI = 3.14;

class Shape {

  type = 'фигуры';

  _countSquare() {}
  getSquare() {
    let result = this._countSquare();
    return `Площадь ${result[0]}: ${result[1]}`;
  }

  _countPerimeter() {}
  getPerimeter() {
    let result = this._countPerimeter();
    return `Периметр ${result[0]}: ${result[1]}`;
  }
}

class Rectangle extends Shape {

  type = 'прямоугольника';

  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }

  _countSquare() {
    let square = this._height * this._width
    return [this.type, square];
  }

  _countPerimeter() {
    let perimeter = (this._height + this._width) * 2;
    return [this.type, perimeter];
  }
}

class Triangle extends Shape {
  type = 'треугольника';

  constructor(side1, side2, side3) {
    super();
    this._side1 = side1;
    this._side2 = side2;
    this._side3 = side3;
  }

  _countSquare() {
    let p = (this._countPerimeter()[1]) / 2;
    let square = (Math.sqrt(p * (p - this._side1) * (p - this._side2) * (p - this._side3))).toFixed(2);
    return [this.type, square];
  }

  _countPerimeter() {
    let perimeter = (this._side1 + this._side2 + this._side3);
    return [this.type, perimeter];
  }
}

class Circle extends Shape {
  type = 'круга';

  constructor(radius) {
    super();
    this._radius = radius;
  }

  _countSquare() {
    let square = PI * this._radius * this._radius;
    return [this.type, square];
  }

  _countPerimeter() {
    let perimeter = 2 * this._radius * PI;
    return [this.type, perimeter];
  }
}

const rectangle = new Rectangle(5, 3);
console.log(rectangle);
console.log(rectangle.getPerimeter());
console.log(rectangle.getSquare());

const triangle = new Triangle(5, 10, 7);
console.log(triangle);
console.log(triangle.getPerimeter());
console.log(triangle.getSquare());

const circle = new Circle(7);
console.log(circle);
console.log(circle.getPerimeter());
console.log(circle.getSquare());
