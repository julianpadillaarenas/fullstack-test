
export const Loading = () => {
  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-pulse text-slate-600">Cargando aplicación...</div>
          <div className="text-sm text-slate-400 mt-2">Cargando usuarios y solicitudes</div>
        </div>
      </div>
    );
}
