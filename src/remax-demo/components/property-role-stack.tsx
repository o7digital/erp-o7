import { AdvisorBadge } from "@/remax-demo/components/advisor-badge";
import { getAdvisorsByIds } from "@/remax-demo/stats";

export function PropertyRoleStack({
  title,
  advisorIds,
  emptyLabel
}: {
  title: string;
  advisorIds: string[];
  emptyLabel: string;
}) {
  const advisors = getAdvisorsByIds(advisorIds);

  return (
    <div className="remax-role-stack">
      <span>{title}</span>
      {advisors.length > 0 ? (
        <div className="inline-stack">
          {advisors.map((advisor) => (
            <AdvisorBadge key={advisor.id} advisor={advisor} />
          ))}
        </div>
      ) : (
        <p className="muted">{emptyLabel}</p>
      )}
    </div>
  );
}
