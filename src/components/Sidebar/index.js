const Sidebar = (props) => {
    const {name, show, className} = props;

    return (
        <div className={className} >
            <h1>{name}</h1>
        </div>)
}

export default Sidebar;