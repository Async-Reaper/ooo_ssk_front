import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@features/Auth";
import { useSelector } from "react-redux";
import { UserRoles, getUserAuthData, getUserInited } from "@entities/user";
import { getRouteMain, getRouteOrders } from "@shared/const/router";
import {
  Circle, Layer, Line, Stage, 
} from "react-konva";
import cls from "./LoginPage.module.scss";

const getRandomValue = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const generateCirclesData = (count: number): { x: number; y: number; dx: number; dy: number; radius: number }[] => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push({
      x: getRandomValue(0, window.innerWidth),
      y: getRandomValue(10, 320),
      dx: getRandomValue(-1, 1),
      dy: getRandomValue(-1, 1),
      radius: getRandomValue(1, 3),
    });
  }
  return circles;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const inited = useSelector(getUserInited);
  const auth = useSelector(getUserAuthData);
  const [circles, setCircles] = useState<{ x: number; y: number; dx: number; dy: number; radius: number }[]>([]);
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number } | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX });
    // Проверяем, находится ли курсор внутри блока
    if (
      clientX >= rect.left
      && clientX <= rect.right
      && clientY >= rect.top
      && clientY <= rect.bottom
    ) {
      setIsMouseInside(true);
    } else {
      setIsMouseInside(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prevCircles) => prevCircles.map((circle) => {
        let newX = circle.x + circle.dx;
        let newY = circle.y + circle.dy;

        // Если точка выходит за границы, переносим её на противоположную сторону (эффект "переноса")
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
    }, 16); // ~60 FPS

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  useEffect(() => {
    setCircles(generateCirclesData(Math.floor(100)));
  }, []);
  
  useEffect(() => {
    if (inited && auth) {
      if (auth.role === UserRoles.BUYER) {
        navigate(getRouteMain());
      } else {
        navigate(getRouteOrders());
      }
    }
  }, [auth, navigate]);

  return (

    <div className={cls.login_page}>
      <div className={cls.login__form__wrapper}>
        <AuthForm />
      </div>
      <div
        onMouseMove={handleMouseMove}
        className={cls.animation__wrapper}
      >
        <Stage width={window.innerWidth} height={320}>
          <Layer>
            {/* {isMouseInside */}
            {/*  && circles.map((circle1, index1) => circles */}
            {/*    .filter((circle2, index2) => index1 < index2) */}
            {/*    .map((circle2, index2) => ( */}
            {/*      <Line */}
            {/*        key={`${index1}-${index2}`} */}
            {/*        points={[circle1.x, circle1.y, circle2.x, circle2.y]} */}
            {/*        stroke="rgba(255, 255, 255, 0.3)" */}
            {/*        strokeWidth={1} */}
            {/*      /> */}
            {/*    )))} */}
            {(mousePosition)
              && circles
                .filter(
                  (circle) => circle.x >= mousePosition.x - 150 // Левая граница
                    && circle.x <= mousePosition.x + 150, // Правая граница
                )
                .map((circle1, index1) => circles
                  .filter(
                    (circle2, index2) => index1 < index2 // Избегаем дублирования линий
                        && circle2.x >= mousePosition.x - 150 // Левая граница
                        && circle2.x <= mousePosition.x + 150, // Правая граница
                  )
                  .map((circle2, index2) => (
                    <Line
                      key={`${index1}-${index2}`}
                      points={[circle1.x, circle1.y, circle2.x, circle2.y]}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth={1}
                    />
                  )))}
            {
              circles.map((circle) => (
                <Circle
                  x={circle.x}
                  y={circle.y}
                  radius={circle.radius}
                  fill="gray"
                />
              ))
            }
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default LoginPage;
