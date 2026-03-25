export function ProblemVsSolution() {
  return (
    <div className="remax-comparison-grid">
      <article className="remax-comparison-column remax-comparison-column-problem">
        <span className="remax-comparison-label">Sistema actual</span>
        <h3>Microsoft Access</h3>
        <ul className="remax-feature-list">
          <li>Estructura limitada para manejar multiples roles del mismo asesor.</li>
          <li>Dependencia operativa de procesos manuales y comunicados fuera de sistema.</li>
          <li>Experiencia antigua, poco clara para un equipo de 35 personas.</li>
          <li>Mantenimiento complejo y trazabilidad parcial entre alta, baja y cancelacion.</li>
        </ul>
      </article>

      <article className="remax-comparison-column remax-comparison-column-solution">
        <span className="remax-comparison-label">Nueva plataforma</span>
        <h3>Astro + Supabase + Railway</h3>
        <ul className="remax-feature-list">
          <li>Roles multiples por propiedad con arrays separados para alta, baja y cancelacion.</li>
          <li>Historico completo de valores y comunicados centralizados.</li>
          <li>Web moderna multiusuario, preparada para staff administrativo y asesores.</li>
          <li>Base de datos escalable, trazabilidad real y camino claro hacia mobile.</li>
        </ul>
      </article>
    </div>
  );
}
