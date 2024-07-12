const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js'); 
const cloudHelper = require('../../../../../../helper/cloud_helper.js'); 

const CACHE_DAY_CHECK_REASON = 'CACHE_DAY_CHECK_REASON';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,

		name: '',
		start: '',
		end: '',

		_params: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	bindClearTap: function (e) {
		this.setData({
			start: '',
			end: '',
			name: ''
		});
	},

	bindSearchTap: function (e) {
		let _params = {
			start: this.data.start,
			end: this.data.end,
			name: this.data.name
		};
		this.setData({
			_params
		})
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},


	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},


	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/day_del', params, opts).then(res => {

					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},

	_getSearchMenu: async function () {
		return;
	}

})