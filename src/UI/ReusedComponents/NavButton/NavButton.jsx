import { useEffect, useRef, useState } from 'react'
import { useHref, useNavigate } from 'react-router-dom'
import styles from './NavButton.module.scss'

export const NavButton = ({
	textContent,
	setSelectedButton,
	selectedButton,
}) => {
	const buttonRef = useRef(null)
	const path = useHref()

	const [isHover, setIsHover] = useState(false)
	const [currentTextContent, setcurrentTextContent] = useState('')

	const convertToParam = str => {
		return str.split(' ').join('').toLowerCase()
	}

	const getPath = () => {
		if (path === '/aboutme') {
			return 'About me'
		}
		return path
			.split('')
			.map((el, index) => {
				if (el === '/') {
					return
				} else if (index === 1) {
					return el.toUpperCase()
				} else return el
			})
			.join('')
	}

	useEffect(() => {
		setcurrentTextContent(buttonRef.current.textContent)
		setSelectedButton(getPath())
		console.log(getPath())
	}, [])
	const navigate = useNavigate()
	return (
		<form
			ref={buttonRef}
			onSubmit={e => {
				e.preventDefault()
				setcurrentTextContent(e.target.textContent)
				setSelectedButton(e.target.textContent)
				navigate(`/${convertToParam(e.target.textContent)}`)
			}}
			onMouseEnter={() => {
				setIsHover(true)
			}}
			onMouseLeave={() => {
				setIsHover(false)
			}}
			className={styles.navButtonGroup}
		>
			<button className={styles.navButton}>{textContent}</button>

			<div
				onClick={() => {
					console.log(buttonRef.current.textContent)

					setcurrentTextContent(buttonRef.current.textContent)
					setSelectedButton(buttonRef.current.textContent)
					navigate(`/${convertToParam(buttonRef.current.textContent)}`)
				}}
				className={`${styles.underline} ${
					isHover && selectedButton !== currentTextContent ? styles.hover : ''
				} ${selectedButton === currentTextContent ? styles.clicked : ''}`}
			/>
		</form>
	)
}