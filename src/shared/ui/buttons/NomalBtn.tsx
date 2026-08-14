

interface NomalBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}


// * 역할 선택용으로 주로 쓰일 예정
export function NomalBtn({children, className='', ...props}: NomalBtnProps) {
    return (
        <button type="button"
            className={`font-bold rounded-xl cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}