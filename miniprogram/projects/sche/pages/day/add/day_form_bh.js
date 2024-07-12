const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');

module.exports = Behavior({

	methods: {

		_checkData: function (data) {
			if (this.data.formDays.length <= 1) {
				pageHelper.anchor('formDate', this);
				return pageHelper.showModal('请选择日期');
			}

			let type = this.data.formType;
			if (type == 0) {
				// 请假
				if (this.data.formMethod.length == 0) {
					pageHelper.anchor('formMethod', this);
					return pageHelper.showModal('请选择请假类型');
				}

				data.area = [];
				data.method = this.data.formMethod; 
				data.desc = this.data.formDesc0;

			}
			else if (type == 1) {
				// 出差
				if (this.data.formArea.length == 0) {
					pageHelper.anchor('formArea', this);
					return pageHelper.showModal('请选择出差地点');
				}

				// 出差
				if (this.data.formDesc1.length == 0) {
					pageHelper.anchor('formArea', this);
					return pageHelper.showModal('请填写出差事由');
				}

				data.area = this.data.formArea;
				data.method = '';  
				data.desc = this.data.formDesc1;
			}
			else if (type == 2) {
				data.area = [];
				data.method = '';  
				data.desc = this.data.formDesc2;
			}
			else if (type == 9) {
				data.area = [];
				data.method = '';  
				data.desc = this.data.formDesc9;
			}
			return true;
		}, 

		bindMonthChangeCmpt: function (e) {
			console.log(e.detail)
		},

		bindMonthChangeCmpt2: function (e) {
			console.log(e.detail)
		},

		bindClickCmpt2: async function (e) {
			let formDays = e.detail.days;

			this.setData({
				formDays
			});

		},

		bindSetDaysTap: async function (e) {

			let days = this.data.formDays;
			if (!days || !Array.isArray(days) || days.length != 2)
				return pageHelper.showNoneToast('请选择日期');


			this.setData({
				showModal: false,

			});

		},

		bindAreaChange: function (e) { 
			let formArea = e.detail.value;
			this.setData({ formArea });
		},

		bindCloseTap: function (e) {
			this.setData({
				showModal: false,
			})
		},

		bindAddShowTap: function (e) {
			this.setData({
				showModal: true,
			})
		},

		bindRadioCmpt: function (e) {
			let formType = e.detail;
			let formArea = this.data.formArea;
			if (formType != 1) formArea = [];
			if (formType == 2) formArea = ['云南省', '昆明市'];
			this.setData({ formType, formArea });
		},

		bindTypeChange: function (e) {
			let type = pageHelper.dataset(e, 'type');
			this.setData({
				formType: type,
				checkType0: false,
				checkType1: false,
				checkType2: false,
				checkType9: false,
			}, () => {
				this.setData({ ['checkType' + type]: true })
			});
		},

		bindClearTap: async function (e) {
			let cb = async () => {
				try {

					let data = { date: this.data.formDays[0] }; 

					let opts = {
						title: '提交中'
					}
					await cloudHelper.callCloudSumbit('day/day_clear_my', data, opts).then(result => {

						let callback = async () => {
							let parent = pageHelper.getPrevPage(2);
							if (parent) {
								await parent._loadHasList();
								await parent._loadList();
							}
							wx.navigateBack();
						}
						pageHelper.showSuccToast('操作成功', 1500, callback);

					});
				} catch (err) {
					console.error(err);
				}
			}
			pageHelper.showConfirm('确认清空？', cb);

		},
 
	}
})