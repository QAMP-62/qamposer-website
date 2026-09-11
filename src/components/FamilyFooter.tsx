import { useTranslation } from '../i18n';
import family from '../data/fwq-family.json';

/**
 * "Part of the Fun with Quantum family" — the sibling projects QAMPoser belongs to.
 *
 * The list comes from the shared family manifest (family/family.json in
 * JanLahmann/Fun-with-Quantum). The vendored copy in src/data/fwq-family.json is refreshed by an
 * automated pull request whenever the roster changes, so nothing here needs hand-editing.
 */
interface Member {
  id: string;
  name: string;
  url: string;
  short?: string;
  footer: boolean;
}

const SELF_ID = 'qamposer';

export function FamilyFooter() {
  const { t } = useTranslation();
  const members = (family.members as Member[]).filter((m) => m.footer && m.id !== SELF_ID);

  return (
    <div className="footer__family">
      <p className="footer__family-tagline">{family.brand.tagline.l}</p>
      <p className="footer__family-lead">{t('footer.family')}</p>
      <ul className="footer__family-list">
        {members.map((m) => (
          <li key={m.id}>
            <a href={m.url} target="_blank" rel="noopener noreferrer">
              <span>{m.name}</span>
              {m.short && <small>{m.short}</small>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
