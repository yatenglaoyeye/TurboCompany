const pageHelper = require('../../../../../helper/page_helper.js'); 
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		ProjectBiz.initPage(this);

	//	if (!await PassportBiz.loginMustBackWin(this)) return;

		if (!pageHelper.getOptions(this, options, "date")) return;
		if (!pageHelper.getOptions(this, options, "dept")) return;
		if (!pageHelper.getOptions(this, options, "type")) return;

		this._loadList();
	},

	_loadList: async function () {
		try {
			let options = {
				title: 'bar'
			};
			let params = {
				type: this.data.type,
				dept: this.data.dept,
				date: this.data.date
			}

			let route = 'day/all_list';
			if (this.data.type == 99) route = 'day/all_not_list';
			else if (this.data.type == 999) route = 'day/current_list';

			await cloudHelper.callCloudSumbit(route, params, options).then(res => {
				this.setData({
					isLoad: true,
					list: res.data.list
				})
			});
		}
		catch (error) {
			console.error(err);
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	async onPullDownRefresh() {
		this._loadList();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})