const pageHelper = require('../../../../../helper/page_helper.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const DayBiz = require('../../../biz/day_biz.js');
const behavior = require('./day_form_bh.js'); 

Page({

	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		showModal: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);

		this.setData(DayBiz.initFormData()); // 初始化表单数据
		this.setData({
			isLoad: true
		});

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
		PassportBiz.loginSilence(this);
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
	onPullDownRefresh() {

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

	bindSubmitTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let cb = async() => {
			try {

				let data = {};
				if (!this._checkData(data)) return;

				data.type = this.data.formType;
				data.days = this.data.formDays;

				let opts = {
					title: '提交中'
				}
				await cloudHelper.callCloudSumbit('day/insert', data, opts).then(result => {

					let callback = () => {
						wx.reLaunch({ url: '../../my/index/my_index' });
					}

					pageHelper.showSuccToast('提交成功', 1500, callback);

				});
			} catch (err) {
				console.error(err);
			}
		}

		await cb();
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})