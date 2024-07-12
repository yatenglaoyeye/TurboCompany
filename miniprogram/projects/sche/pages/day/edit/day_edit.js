const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const DayBiz = require('../../../biz/day_biz.js');
const behavior = require('../add/day_form_bh.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({

	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		isEdit: true,
		isLoad: false,
		showModal: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		ProjectBiz.initPage(this);
		if (!pageHelper.getOptions(this, options)) return;

		if (!await PassportBiz.loginMustBackWin(this)) return;

		this.setData(DayBiz.initFormData(this.data.id)); // 初始化表单数据

		this._loadDetail();

	},

	_loadDetail: async function () {

		let id = this.data.id;
		if (!id) return;

		let params = {
			id
		};

		if (!this.data.isLoad) this.setData(DayBiz.initFormData(id)); // 初始化表单数据

		let opt = {
			title: 'bar'
		};
		let day = await cloudHelper.callCloudData('day/detail', params, opt);
		if (!day) {
			this.setData({
				isLoad: null
			})
			return;
		};


		let type = day.DAY_TYPE;

		if (type == 0) {
			// 请假
			this.setData({
				isLoad: true,
				checkType0: true,
				checkType1: false,
				checkType2: false,
				checkType9: false,

				// 表单数据   
				formDays: [day.DAY_DATE, day.DAY_DATE],
				formType: type,
				formMethod: day.DAY_METHOD,  

				formArea: [],

				formDesc0: day.DAY_DESC,
				formDesc1: '',
				formDesc2: '',
				formDesc9: '',
			});

		}
		else if (type == 1) {
			// 出差
			this.setData({
				isLoad: true,
				checkType0: false,
				checkType1: true,
				checkType2: false,
				checkType9: false,

				// 表单数据   
				formDays: [day.DAY_DATE, day.DAY_DATE],
				formType: type,
				formMethod: '',  

				formArea: day.DAY_AREA,

				formDesc0: '',
				formDesc1: day.DAY_DESC,
				formDesc2: '',
				formDesc9: '',
			});
		}
		else if (type == 2) {
			// 在公司
			this.setData({
				isLoad: true,
				checkType0: false,
				checkType1: false,
				checkType2: true,
				checkType9: false,

				// 表单数据   
				formDays: [day.DAY_DATE, day.DAY_DATE],
				formType: type,
				formMethod: '',  

				formArea: [],

				formDesc0: '',
				formDesc1: '',
				formDesc2: day.DAY_DESC,
				formDesc9: '',
			});
		}
		else if (type == 9) {
			this.setData({
				isLoad: true,
				checkType0: false,
				checkType1: false,
				checkType2: false,
				checkType9: true,

				// 表单数据   
				formDays: [day.DAY_DATE, day.DAY_DATE],
				formType: type,
				formMethod: '',  

				formArea: [],

				formDesc0: '',
				formDesc1: '',
				formDesc2: '',
				formDesc9: day.DAY_DESC,
			});
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
		this._loadDetail();
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

	bindSubmitTap: async function (e) {
		let cb = async () => {
			try {

				let data = {};
				if (!this._checkData(data)) return;

				data.type = this.data.formType;
				data.days = this.data.formDays;
				data.id = this.data.id;

				let opts = {
					title: '提交中'
				}
				await cloudHelper.callCloudSumbit('day/edit', data, opts).then(result => {

					let callback = async () => {
						let parent = pageHelper.getPrevPage(2);
						if (parent) await parent._loadList();
						wx.navigateBack();
					}

					pageHelper.showSuccToast('修改成功', 1500, callback);

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