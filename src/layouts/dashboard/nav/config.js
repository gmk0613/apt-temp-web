// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '온도 현황',
    path: '/tempStatus',
    icon: icon('ic_dashboard'),
  },
  {
    title: '사용자 리스트',
    path: '/userMgmt',
    icon: icon('ic_person'),
  },
  {
    title: '사용 요청 승인',
    path: '/userApprove',
    icon: icon('ic_check'),
  },
  {
    title: '아파트 설정',
    path: '/aptSet',
    icon: icon('ic_apt'),
  },
  {
    title: '매니저 추가/삭제',
    path: '/mamagerMgmt',
    icon: icon('ic_manage'),
  },
  {
    title: 'MQTT설정',
    path: '/mqttSet',
    icon: icon('ic_signal'),
  },
  // {
  //   title: 'dashboard/삭제',
  //   path: '/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'product/삭제',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog/삭제',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
];

export default navConfig;
