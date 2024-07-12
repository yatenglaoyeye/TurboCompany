const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		list: [],

		formTitle: '',

		id: '',
		day: '',
		hasDays: [],

		addDays: [], //提交动态的日期

		showModal: false,


	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		if (!await PassportBiz.loginMustBackWin(this)) return;

		if (!this.data.day) {
			this.setData({
				day: timeHelper.time('Y-M-D')
			}, async () => {
				await this._loadHasList();
				await this._loadList();
			});
		} else {
			await this._loadHasList();
			await this._loadList();
		}
	},

	_loadList: async function (isShowLoad = true) {
		let params = {
			day: this.data.day
		}
		let opts = {
			title: this.data.isLoad ? 'bar' : 'bar'
		}
		try {
			if (isShowLoad) {
				this.setData({
					list: null
				});
			}

			await cloudHelper.callCloudSumbit('day/list_by_day', params, opts).then(res => {
				this.setData({
					list: res.data,
					isLoad: true
				});
			});
		} catch (err) {
			console.error(err);
		}
	},

	_loadHasList: async function () {
		let params = {
			day: timeHelper.time('Y-M-D')
		}
		let opts = {
			title: 'bar'
		}
		try {
			await cloudHelper.callCloudSumbit('day/list_has_day', params, opts).then(res => {
				this.setData({
					hasDays: res.data,
				});
			});
		} catch (err) {
			console.error(err);
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		PassportBiz.loginSilence(this);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadHasList();
		await this._loadList();
		wx.stopPullDownRefresh();
	},


	bindClickCmpt: async function (e) {
		let day = e.detail.day;

		this.setData({
			day
		}, async () => {
			await this._loadList();
		})

	},

	bindClickCmpt2: async function (e) {
		let addDays = e.detail.days;

		console.log(addDays)
		this.setData({
			addDays
		});

	},

	bindMonthChangeCmpt: function (e) {
		console.log(e.detail)
	},

	bindMonthChangeCmpt2: function (e) {
		console.log(e.detail)
	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindAddTap: async function (e) {
		let id = this.data.id;

		let time = this.data.addDays;
		if (!time || !Array.isArray(time) || time.length != 2)
			return pageHelper.showNoneToast('请选择日期');

		let title = this.data.formTitle;
		if (!title)
			return pageHelper.showNoneToast('请填写内容！');

		let cb = async () => {
			try {

				let params = {
					id,
					title,
					time: this.data.addDays
				};
				let opts = {
					title: '提交中'
				}
				await cloudHelper.callCloudSumbit('day/insert', params, opts).then(res => {
				 


					this.setData({
						showModal: false,
						id: '',
						formTitle: '',
						addDays: []
					});
					let cb = () => {
						this.setData({
							list: null
						})
						this._loadList(false);
						this._loadHasList();
					}
					pageHelper.showSuccToast(id ? '修改成功' : '添加成功', 2000, cb);
				})
			} catch (err) {
				console.error(err);
			}
		}
		cb();
	},

	bindDelTap: async function (e) {
		let cb = async () => {
			try {
				let id = pageHelper.dataset(e, 'id');
				if (!id) return;

				let params = {
					id,
				};
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('day/del', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.list, '_id');
					this.setData({
						list: this.data.list
					});
					this._loadHasList();

					pageHelper.showSuccToast('删除成功');
				})
			} catch (err) {
				console.error(err);
			}
		}

		pageHelper.showConfirm('确认删除？删除不可恢复', cb);
	},

	bindCloseTap: function (e) {
		this.setData({
			showModal: false,
			id: '',
			addDays: [],
			formTitle: ''
		})
	},

	bindAddShowTap: function (e) {
		this.setData({
			showModal: true,
			id: '',
			addDays: [],
			formTitle: '',
		})
	},

	bindEditShowTap: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let node = this.data.list[idx];
		if (!node) return;

		this.setData({
			showModal: true,

			id: node._id,
			addDays: [node.DAY_DATE, node.DAY_DATE],
			formTitle: node.DAY_TITLE,
		})
	},

	bindClearTap: function (e) {
		this.setData({
			formTitle: ''
		})
	}

})