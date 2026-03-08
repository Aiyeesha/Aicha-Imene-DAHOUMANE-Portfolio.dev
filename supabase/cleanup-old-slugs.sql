-- supabase/cleanup-old-slugs.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- Supprime les anciens slugs (tssr-* / tai-* / monitoring-automation-pack)
-- remplacés par les nouveaux slugs it-ops-*.
-- Ordre : project_assets d'abord (FK), puis projects.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Supprimer les project_assets liés aux anciens slugs ───────────────────
DELETE FROM project_assets
WHERE project_id IN (
  SELECT id FROM projects
  WHERE slug IN (
    'tssr-windows-autopilot-provisioning',
    'tssr-secure-wipe-and-imaging',
    'tssr-incident-management-rmm',
    'tssr-acronis-backup-recovery',
    'tssr-virtualization-windows-server-2022',
    'tssr-pfsense-squid-proxy',
    'tai-disk-partition-backup-restore',
    'tai-wifi-access-point-setup',
    'tai-roaming-profile-adds',
    'tai-email-configuration-guide',
    'monitoring-automation-pack',
    'tssr-hardware-upgrade-clone',
    'tssr-it-procurement-quote'
  )
);

-- ── 2. Supprimer les anciens projets ─────────────────────────────────────────
DELETE FROM projects
WHERE slug IN (
  'tssr-windows-autopilot-provisioning',
  'tssr-secure-wipe-and-imaging',
  'tssr-incident-management-rmm',
  'tssr-acronis-backup-recovery',
  'tssr-virtualization-windows-server-2022',
  'tssr-pfsense-squid-proxy',
  'tai-disk-partition-backup-restore',
  'tai-wifi-access-point-setup',
  'tai-roaming-profile-adds',
  'tai-email-configuration-guide',
  'monitoring-automation-pack',
  'tssr-hardware-upgrade-clone',
  'tssr-it-procurement-quote'
);

-- ── 3. Vérification : doit retourner 0 ligne ─────────────────────────────────
SELECT slug, locale, featured, sort_order
FROM projects
WHERE slug IN (
  'tssr-windows-autopilot-provisioning',
  'tssr-secure-wipe-and-imaging',
  'tssr-incident-management-rmm',
  'tssr-acronis-backup-recovery',
  'tssr-virtualization-windows-server-2022',
  'tssr-pfsense-squid-proxy',
  'tai-disk-partition-backup-restore',
  'tai-wifi-access-point-setup',
  'tai-roaming-profile-adds',
  'tai-email-configuration-guide',
  'monitoring-automation-pack',
  'tssr-hardware-upgrade-clone',
  'tssr-it-procurement-quote'
);
