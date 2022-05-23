import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer 
      //  content="欢迎使用 ProLayout 组件"
      title={<div style={{height:'1.3rem'}}>
        <div className="giant">欢迎访问巨人后台管理系统</div>
      </div>}
       
       >
      <Card>
        <Alert
          message={"寄语"}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        {/* <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="高级表格" />{' '}
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
          </a>
        </Typography.Text> */}
        <CodePreview>
            Giant <br />
            To be a giant. <br />

            This has forever been our passion, this desire to be a giant.<br />

            Not to stand on one&rsquo;s shoulders or have one for a friend.<br />

            For these may be fortunate things.<br />

            But to be one.<br />

            Giants step over barriers that seem never ending.<br />

            They conquer mountains that appear insurmountable.<br />

            Giant rise above fear.<br />

            Triumph over pain.<br />

            Push themselves and inspire others.<br />

            To be a Giant.<br />

            To do Giant things.<br />

            To take Giant steps.<br />

            To move the world forward.<br />
        </CodePreview>
        {/* <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          <FormattedMessage id="pages.welcome.advancedLayout" defaultMessage="高级布局" />{' '}
          <a
            href="https://procomponents.ant.design/components/layout"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
          </a>
        </Typography.Text> */}
        <CodePreview>
        巨人<br />

        成为一个巨人，<br />

        这永远是我们最强烈的欲望，<br />

        成为一个巨人，<br />

        不是站在一个巨人的肩上，或是成为他的朋友。<br />

        那或许是靠运气。<br />

        而要成为一个巨人是不一样的，<br />

        好像巨人们永远都得跨越障碍。<br />

        他们征服看似不可超越的高山。<br />

        巨人们超越恐惧。<br />

        击败痛苦。<br />

        鞭策自己，鼓励他人。<br />

        成为一个巨人，<br />

        做巨人做的事。<br />

        走巨人走的路。<br />

        推动整个世界向前进<br />
        </CodePreview>
      </Card>
    </PageContainer>
  );
};
