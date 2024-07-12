/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2020-10-14 07:00:00
 */

module.exports = {
	'job/do': 'job_controller@do', //定时器

	'test/test': 'test/test_controller@test',

	'home/setup_get': 'home_controller@getSetup',

	// 内容
	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews#demo',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews#demo',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms#demo',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic#demo',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent#demo',
	'admin/news_del': 'admin/admin_news_controller@delNews#demo',
	'admin/news_sort': 'admin/admin_news_controller@sortNews#demo',
	'admin/news_status': 'admin/admin_news_controller@statusNews#demo',
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews#demo',

	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',


	'stat/all': 'stat_controller@statAll',

	'day/day_clear_my': 'day_controller@clearMyDay',
	'day/day_my': 'day_controller@getMyDay',
	'day/all_list': 'day_controller@getAllDayList',
	'day/all_not_list': 'day_controller@getAllNotDayList',
	'day/current_list': 'day_controller@getCurrentDayList',
	'day/del': 'day_controller@delDay',
	'day/detail': 'day_controller@getDetail',
	'day/insert': 'day_controller@insertDay',
	'day/edit': 'day_controller@editDay',
	'day/list_by_day': 'day_controller@getDayListByDay',
	'day/list_has_day': 'day_controller@getDayHasDaysFromDay',

	'admin/day_list': 'admin/admin_day_controller@getDayList',
	'admin/day_del': 'admin/admin_day_controller@delDay#demo',

	'admin/day_data_get': 'admin/admin_day_controller@dayDataGet',
	'admin/day_data_export': 'admin/admin_day_controller@dayDataExport',
	'admin/day_data_del': 'admin/admin_day_controller@dayDataDel',

	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr#demo',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr#demo',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr#demo',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr#demo',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr#demo',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_edit': 'admin/admin_user_controller@editUser#demo',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser#demo',
	'admin/user_status': 'admin/admin_user_controller@statusUser#demo',
	'admin/user_level': 'admin/admin_user_controller@levelUser#demo',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',

}