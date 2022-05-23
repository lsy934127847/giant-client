import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Giant',
  pwa: false,
  logo: 'http://www.xsumb.com/uploads/allimg/200329/124051H91-6.jpg',
  // logo: 'https://pic1.zhimg.com/v2-58d51f508827b08c7eb2fec472f751a7_1440w.jpg?source=172ae18b',
  
  iconfontUrl: '',
};

export default Settings;
