import { FC } from 'react'
import styled, { keyframes } from 'styled-components'

export const ChristmasTree: FC = () => {
	return (
		<TreeChristmas>
			<Tree>
				<TreeDetails></TreeDetails>
			</Tree>
			<Lights>
				<RowOne></RowOne>
				<RowTwo></RowTwo>
			</Lights>

			<Balls></Balls>
			<Star></Star>
			<Shadow></Shadow>
		</TreeChristmas>
	)
}

const TreeChristmas = styled.div`
	position: relative;
	top: 100px;
	cursor: pointer;
`
const Tree = styled.div`
	position: absolute;
	width: 20px;
	height: 0;
	border-right: 5px solid transparent;
	border-left: 5px solid transparent;
	border-bottom: 55px solid #823723;
	::before {
		content: '';
		position: absolute;
		background-color: #823723;
		border-radius: 50%;
		width: 30px;
		height: 10px;
		top: 50px;
		left: -5px;
	}
	::after {
		content: '';
		position: absolute;
		border-right: 75px solid transparent;
		border-left: 75px solid transparent;
		border-bottom: 200px solid #107761;
		width: 0;
		height: 0;
		top: -180px;
		left: -65px;
	}
`
const TreeDetails = styled.div`
	position: absolute;
	background-color: #107761;
	border-radius: 50%;
	width: 150px;
	height: 10px;
	top: 15px;
	left: -65px;
	z-index: 1;
	::before {
		content: '';
		position: absolute;
		background-color: #0a897c;
		border-radius: 50%;
		width: 5px;
		height: 5px;
		top: -10px;
		left: 20px;
		box-shadow: 50px -50px #0a897c, 30px -70px #0a897c, 40px -130px #0a897c,
			70px -5px #0a897c, 85px -75px #0a897c;
	}
`
const light = keyframes`
	0% {filter: drop-shadow(0 0 2px #fefae0) brightness(1);}
  	50% {filter: drop-shadow(0 0 5px #fefae0) brightness(1.35);}
  	100% {filter: drop-shadow(0 0 2px #fefae0) brightness(1);}
`
const drop = keyframes`
	0% {transform: translateY(-470px) scaleY(0.9); opacity: 0;}
	5% {opacity: 1;}
	50% {transform: translateY(0px) scaleY(1); opacity: 1;}
	65% {transform: translateY(-15px) scaleY(0.9); opacity: 1;}
	75% {transform: translateY(-18px) scaleY(0.9); opacity: 1;}
	100% {transform: translateY(0px) scaleY(1); opacity: 1;}
`
const dropStar = keyframes`
	0% {transform: translateY(-470px) scaleY(0.9) rotate(-35deg); opacity: 0;}
	5% {opacity: 1;}
	50% {transform: translateY(0px) scaleY(1) rotate(-35deg); opacity: 1;}
	65% {transform: translateY(-15px) scaleY(0.9) rotate(-35deg); opacity: 1;}
	75% {transform: translateY(-18px) scaleY(0.9) rotate(-35deg); opacity: 1;}
	100% {transform: translateY(0px) scaleY(1) rotate(-35deg); opacity: 1;}
	100% {transform: translateY(0px) scaleY(1) rotate(-35deg); opacity: 1;}
`

const Lights = styled.div`
	position: absolute;
	opacity: 0;
	animation: ${light} 2s linear infinite, drop 1s linear 0.5s forwards;
`
const RowOne = styled.div`
	position: absolute;
	background-color: #e9d8a6;
	border-radius: 50%;
	width: 10px;
	height: 10px;
	top: -120px;
	left: -15px;
	box-shadow: 10px 10px #e9d8a6, 25px 15px #e9d8a6, 40px 18px #e9d8a6,
		54px 15px #e9d8a6;
`
const RowTwo = styled.div`
	position: absolute;
	background-color: #e9d8a6;
	border-radius: 50%;
	width: 10px;
	height: 10px;
	left: -42px;
	top: -45px;
	box-shadow: 10px 10px #e9d8a6, 25px 17px #e9d8a6, 40px 24px #e9d8a6,
		55px 28px #e9d8a6, 70px 30px #e9d8a6, 85px 29px #e9d8a6, 100px 25px #e9d8a6,
		112px 20px #e9d8a6;
`
const Balls = styled.div`
	position: absolute;
	background-color: #f34653;
	width: 15px;
	height: 15px;
	border-radius: 50%;
	z-index: 2;
	opacity: 0;
	box-shadow: -20px -55px #f34653, 25px -70px #f34653;
	animation: ${drop} 1s linear 1s forwards;
	::before {
		content: '';
		position: absolute;
		background-color: #f34653;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		left: -40px;
		top: -10px;
		box-shadow: 100px 10px #f34653, 25px -80px #f34653, 60px -120px #f34653;
	}
	::after {
		content: '';
		position: absolute;
		background-color: #94d2bd;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		top: -40px;
		left: 40px;
		box-shadow: -35px -35px #94d2bd, -35px -105px #94d2bd, -60px 45px #94d2bd;
	}
`
const Star = styled.div`
	position: absolute;
	display: block;
	width: 0px;
	height: 0px;
	border-right: 25px solid transparent;
	border-bottom: 17.5px solid #f9c819;
	border-left: 25px solid transparent;
	transform: rotate(-35deg);
	top: -190px;
	left: -9px;
	opacity: 0;
	animation: ${dropStar} 1s linear 1.5s forwards;
	:before {
		border-bottom: 20px solid #f9c819;
		border-left: 7.5px solid transparent;
		border-right: 7.5px solid transparent;
		position: absolute;
		height: 0;
		width: 0;
		top: -12.5px;
		left: -17.5px;
		display: block;
		content: '';
		transform: rotate(-35deg);
	}
	:after {
		position: absolute;
		display: block;
		top: 0.75px;
		left: -26.25px;
		width: 0px;
		height: 0px;
		border-right: 25px solid transparent;
		border-bottom: 17.5px solid #f9c819;
		border-left: 25px solid transparent;
		transform: rotate(-70deg);
		content: '';
	}
`
const scale = keyframes`
  0% {transform: scaleX(1);}
  100% {transform: scaleX(3);}
`
const Shadow = styled.div`
	position: absolute;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.7);
	width: 50px;
	height: 20px;
	z-index: -1;
	top: 50px;
	left: -10px;
	animation: ${scale} 0.5s linear forwards;
`
