import React, { useEffect, useState } from "react";
import {
  Circle, Layer, Line, Stage, 
} from "react-konva";
import cls from "./AnimationDots.module.scss";

const getRandomValue = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const generateCirclesData = (count: number): { x: number; y: number; dx: number; dy: number; radius: number }[] => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push({
      x: getRandomValue(0, window.innerWidth),
      y: getRandomValue(10, 320),
      dx: getRandomValue(-0.1, 0.1),
      dy: getRandomValue(-0.1, 0.1),
      radius: getRandomValue(1, 3),
    });
  }
  return circles;
};

const Component = () => {
  const [circles, setCircles] = useState<{ x: number; y: number; dx: number; dy: number; radius: number }[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prevCircles) => prevCircles.map((circle) => {
        let newX = circle.x + circle.dx;
        let newY = circle.y + circle.dy;

        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = 320;
        if (newY > 320) newY = 0;

        return {
          ...circle,
          x: newX,
          y: newY,
        };
      }));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCircles(generateCirclesData(Math.floor(100)));
  }, []);
  
  const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

  // Функция для получения ближайших точек
  const getClosestPoints = (
    points: { x: number; y: number }[],
    _maxDistance: number,
    maxConnections: number,
  ): { from: { x: number; y: number }; to: { x: number; y: number } }[] => {
    const connections: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];

    points.forEach((pointA, indexA) => {
      const closestPoints = points
        .filter((_pointB, indexB) => indexA !== indexB)
        .sort((a, b) => getDistance(pointA, a) - getDistance(pointA, b))
        .slice(0, maxConnections);

      closestPoints.forEach((pointB) => {
        connections.push({ from: pointA, to: pointB });
      });
    });

    return connections;
  };

  // Получаем текущие координаты точек
  const currentPoints = circles.map(({ x, y }) => ({ x, y }));

  // Радиус поиска ближайших точек
  const maxDistance = mousePosition
    ? 200
    : 100; // Увеличиваем радиус при наведении мыши
  const maxConnections = 4; // Максимальное количество соединений для каждой точки

  // Ограничиваем точки только в пределах 300 пикселей от курсора
  const filteredPoints = mousePosition
    ? currentPoints.filter(
      (point) => point.x >= (mousePosition.x - 300)
        && point.x <= (mousePosition.x + 300),
    )
    : currentPoints;

  // Получаем соединения между точками
  const connections = getClosestPoints(filteredPoints, maxDistance, maxConnections);
  
  return (
    <div onMouseMove={handleMouseMove} className={cls.animation__wrapper}>
      <Stage width={window.innerWidth} height={320}>
        <Layer>
          {/* Рисуем линии только при наведении курсора */}
          {mousePosition && (
            <>
              {connections.map(({ from, to }, index) => (
                <Line
                  key={index}
                  points={[from.x, from.y, to.x, to.y]}
                  stroke="gray"
                  strokeWidth={1.5}
                />
              ))}
            </>
          )}

          {/* Рисуем точки */}
          {circles.map((circle) => (
            <Circle
              key={`${circle.x}-${circle.y}`}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill="gray"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export const AnimationDots = React.memo(Component);
