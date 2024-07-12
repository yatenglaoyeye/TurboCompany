const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		showModal: false,
		date: timeHelper.time('Y-M-D'),

		isListLoad: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		ProjectBiz.initPage(this);
		//if (!await PassportBiz.loginMustBackWin(this)) return;

		this._setDateShow();
		await this._loadList();
	},

	_loadList: async function () {
		try {
			let options = {
				title: 'bar'
			};
			let params = {
				level: '1',
				date: this.data.date
			}
			await cloudHelper.callCloudSumbit('day/all_list', params, options).then(res => {
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
		await this._loadList();
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

	bindClickCmpt: async function (e) {
		let date = e.detail.day;

		this.setData({
			list: [],
			isListLoad: false,
			date,
			showModal: false
		});
		this._setDateShow();

		wx.showLoading({
			title: '加载中',
		});
		await this._loadList();
		wx.hideLoading();
		this.setData({ isListLoad: true });
	},

	bindCloseModalTap: function () {
		this.setData({ showModal: false })
	},

	bindOpenModalTap: function () {
		this.setData({ showModal: true })
	},

	_setDateShow() {
		let date = this.data.date;
		let week = timeHelper.week(date).replace('周', '星期');
		let day = timeHelper.timestamp2Time(timeHelper.time2Timestamp(date), 'Y年M月D日');
		this.setData({ dateShow: day + ' ' + week });
	}
})