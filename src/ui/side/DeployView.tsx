import { DIM, ERR, OK } from '~/ui/theme';

export interface DeployData {
  status: 'success' | 'failed' | 'partial';
  elapsedMs: number;
  errors: { component: string; message: string }[];
  succeeded?: number;
}

export function DeployView({ data }: { data: DeployData | null }) {
  if (!data) {
    return (
      <box style={{ flexDirection: 'column' }}>
        <text content="Deploy" />
        <text content="no deploy yet — last sf_deploy_start lands here" style={{ fg: DIM }} />
      </box>
    );
  }

  const headerColor = data.status === 'success' ? OK : data.status === 'partial' ? DIM : ERR;
  const headerLabel =
    data.status === 'success'
      ? 'Deploy SUCCEEDED'
      : data.status === 'partial'
        ? 'Deploy PARTIAL'
        : 'Deploy FAILED';

  return (
    <box style={{ flexDirection: 'column' }}>
      <text
        content={`${headerLabel} · ${(data.elapsedMs / 1000).toFixed(1)}s`}
        style={{ fg: headerColor }}
      />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {data.errors.length === 0 ? (
          <text content="no errors" style={{ fg: DIM }} />
        ) : (
          data.errors.slice(0, 8).map((e, i) => (
            <box key={`${e.component}-${i}`} style={{ flexDirection: 'column' }}>
              <text content={`✗ ${e.component}`} style={{ fg: ERR }} />
              <text content={`  ${e.message}`} style={{ fg: DIM }} />
            </box>
          ))
        )}
        {data.errors.length > 8 ? (
          <text content={`… ${data.errors.length - 8} more`} style={{ fg: DIM }} />
        ) : null}
      </box>
    </box>
  );
}
