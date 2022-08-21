import './Block.scss'

const Block = ({children, className}:any) => {
    return (
        <div className={`${'block'} ${className}`}>
            {children}
        </div>
    )
}

export default Block