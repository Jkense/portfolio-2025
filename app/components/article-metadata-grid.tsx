import type { Metadata } from "app/blog/utils";
import { GeistMono } from "geist/font/mono";

type ArticleMetadataGridProps = {
  metadata: Metadata;
};

function parseReferences(references: string): { title: string; url: string }[] {
  if (!references) return [];
  return references.split(",").map((ref) => {
    const [title, url] = ref.trim().split(":");
    return {
      title: title?.trim() || "",
      url: url ? ref.substring(ref.indexOf(":") + 1).trim() : "",
    };
  });
}

function parseList(value: string): string[] {
  if (!value) return [];
  return value.split(",").map((item) => item.trim());
}

export function ArticleMetadataGrid({ metadata }: ArticleMetadataGridProps) {
  const { timeline, team, role, skills, references } = metadata;

  const hasContent = timeline || team || role || skills || references;
  if (!hasContent) return null;

  const teamList = parseList(team || "");
  const roleList = parseList(role || "");
  const skillsList = parseList(skills || "");
  const referencesList = parseReferences(references || "");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-8">
      {timeline && (
        <div>
          <h4 className={`text-xs uppercase tracking-wide text-muted mb-2 ${GeistMono.className}`}>
            Timeline
          </h4>
          <p className="text-sm text-ds-gray">{timeline}</p>
        </div>
      )}

      {teamList.length > 0 && (
        <div>
          <h4 className={`text-xs uppercase tracking-wide text-muted mb-2 ${GeistMono.className}`}>
            Team
          </h4>
          <ul className="text-sm text-ds-gray space-y-1">
            {teamList.map((member, i) => (
              <li key={i}>{member}</li>
            ))}
          </ul>
        </div>
      )}

      {roleList.length > 0 && (
        <div>
          <h4 className={`text-xs uppercase tracking-wide text-muted mb-2 ${GeistMono.className}`}>
            Role
          </h4>
          <ul className="text-sm text-ds-gray space-y-1">
            {roleList.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {skillsList.length > 0 && (
        <div>
          <h4 className={`text-xs uppercase tracking-wide text-muted mb-2 ${GeistMono.className}`}>
            Skills
          </h4>
          <ul className="text-sm text-ds-gray space-y-1">
            {skillsList.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {referencesList.length > 0 && (
        <div>
          <h4 className={`text-xs uppercase tracking-wide text-muted mb-2 ${GeistMono.className}`}>
            References
          </h4>
          <ul className="text-sm space-y-1">
            {referencesList.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-70 transition-opacity underline underline-offset-2"
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
