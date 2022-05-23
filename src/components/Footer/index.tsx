import { useIntl } from 'umi';

import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
   const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '晋ICP备2021019044号-1',
  });

  return (
    <DefaultFooter
      copyright={`${defaultMessage}`}
      links={[
        {
          key: 'ICP BeiAn',
          title: '晋ICP备2021019044号-1',
          href: 'https://beian.miit.gov.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};
