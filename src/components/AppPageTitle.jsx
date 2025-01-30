export default function AppPageTitle({ icon, title }) {
    return(
        <div className="app-page-title">
            <i> { icon } </i>
            <span> { title } </span>
        </div>
    )
}