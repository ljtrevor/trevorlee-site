import type { Role } from '@/data/profile';

/* One-line timeline rows: dates in the margin, role and employer beside them. */
export function CompactRoleRows({ roles }: { roles: Role[] }) {
  return (
    <ol>
      {roles.map((role) => (
        <li key={`${role.company}-${role.when}`} className="row row--compact">
          <p className={role.current ? 'row__meta row__meta--current' : 'row__meta'}>{role.when}</p>
          <p className="row__body">
            {role.title}, <span>{role.company}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

/* Full timeline rows with a short description under each role. */
export function DetailedRoleRows({ roles }: { roles: Role[] }) {
  return (
    <ol>
      {roles.map((role) => (
        <li key={`${role.company}-${role.when}`} className="row">
          <p className={role.current ? 'row__meta row__meta--current' : 'row__meta'}>
            <span>{role.when}</span>
            {role.note ? <span>{role.note}</span> : null}
          </p>
          <div className="row__body">
            <h3 className="row__title">{role.title}</h3>
            <p className="row__tech">
              {role.company}
              {role.focus ? ` (${role.focus})` : null}
            </p>
            {role.body ? <p>{role.body}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
