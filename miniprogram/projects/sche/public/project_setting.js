const DEPT_OPTIONS = ['总办', '研发部', '市场部', '人事部', '采购部', '测试部', '综合部', '财务部', '工厂'];
module.exports = { // sche
	PROJECT_COLOR: '#5484F0',
	NAV_COLOR: '#000000',
	NAV_BG: '#D9E5FB',

	DEPT_OPTIONS: DEPT_OPTIONS,

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],


	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftpic' },
	],
	NEWS_FIELDS: [

	],
  

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'no', title: '工号', type: 'text', must: true },
		{ mark: 'dept', title: '所属部门', type: 'select', selectOptions: DEPT_OPTIONS, must: true }
	],

	// 
	DAY_NAME: '动态',
	DAY_FIELDS: [
		//	{ mark: 'mobile', title: '手机1', type: 'mobile',  must: true }, 
		//	{ mark: 'desc', title: '事由', type: 'textarea', must: true }
	],




}