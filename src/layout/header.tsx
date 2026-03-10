export default function Header() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-xl font-bold">YeloHub</h1>
                <div>
                    <a href="/catalogo" className="px-3 py-2 rounded hover:bg-gray-700">Catálogo</a>
                    <a href="/admin" className="px-3 py-2 rounded hover:bg-gray-700">Admin</a>
                </div>
            </div>
        </nav>
    )
}