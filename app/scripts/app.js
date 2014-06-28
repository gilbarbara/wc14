'use strict';

window.WC = {
	Models: { },
	Collections: { },
	Views: { },
	Routers: { },

	models: { },
	collections: { },
	views: { },

	$el: $('#content'),
	data: {
		teams: [],
		matches: [],
		players: [],
		venues: {
			'Arena Amazônia (Manaus, Amazonas)': 'Arena Amazônia - Manaus',
			'Arena Corinthians (São Paulo, São Paulo)': 'Arena Corinthians - São Paulo',
			'Estádio Joaquim Américo Guimarães (Curitiba, Paraná)': 'Arena da Baixada - Curitiba',
			'Arena das Dunas (Natal, Rio Grande do Norte)': 'Arena das Dunas - Natal',
			'Itaipava Arena Fonte Nova (Salvador, Bahia)': 'Arena Fonte Nova - Salvador',
			'Arena Pantanal (Cuiabá, Mato Grosso)': 'Arena Pantanal - Cuiabá',
			'Itaipava Arena Pernambuco (Recife, Pernambuco)': 'Arena Pernambuco - Recife',
			'Estádio José Pinheiro Borba (Beira-Rio) (Porto Alegre, Rio Grande do Sul)': 'Estádio Beira-Rio - Porto Alegre',
			'Estádio Governador Plácido Aderaldo Castelo (Fortaleza, Ceará)': 'Estádio Castelão - Fortaleza',
			'Estadio Jornalista Mário Filho (Maracanã) (Rio de Janeiro, Rio de Janeiro)': 'Estadio Maracanã - Rio de Janeiro',
			'Estádio Governador Magalhães Pinto (Belo Horizonte, Minas Gerais)': 'Estádio Mineirão - Belo Horizonte',
			'Estádio Nacional de Brasília (Brasília, Distrito Federal)': 'Estádio Nacional - Brasília'
		},
		countryCode: {
			'Brazil': 'BRA',
			'Mexico': 'MEX',
			'Cameroon': 'CMR',
			'Croatia': 'CRO',
			'Netherlands': 'NED',
			'Chile': 'CHI',
			'Australia': 'AUS',
			'Spain': 'ESP',
			'Colombia': 'COL',
			'Côte d\'Ivoire': 'CIV',
			'Japan': 'JPN',
			'Greece': 'GRE',
			'Costa Rica': 'CRC',
			'Italy': 'ITA',
			'England': 'ENG',
			'Uruguay': 'URU',
			'France': 'FRA',
			'Switzerland': 'SUI',
			'Ecuador': 'ECU',
			'Honduras': 'HON',
			'Argentina': 'ARG',
			'Iran': 'IRN',
			'Nigeria': 'NGA',
			'Bosnia-Herzegovina': 'BIH',
			'Germany': 'GER',
			'Ghana': 'GHA',
			'United States': 'USA',
			'Portugal': 'POR',
			'Belgium': 'BEL',
			'Algeria': 'ALG',
			'Russia': 'RUS',
			'Korea Republic': 'KOR'
		},
		stages: {
			'Round of 16': 1403924400,
			'Quarter-finals': 1404442800,
			'Semi-finals': 1404788400,
			'Third Place': 1405134000,
			'Final': 1405220400
		},
		stats: {
			totalGoals: 0,
			totalMatches: 0,
			totalDraws: 0,
			totalDrawsZero: 0,
			totalPerVenue: {}
		}
	},

	ready: $.Deferred(),
	config: {
		apiUrl: 'http://worldcup.kimonolabs.com/api',
		apiKey: '9144470129c2788e93b377ffa8faa3ad'
	},
	columnSize: 'col-xs-12 col-sm-6 col-md-3 col-lg-3',

	init: function () {
		var that = this;

		this.$el = $('#content');

		this.buildData();

		$.get('images/icons.svg',
			function (svgDoc) {
				var importedSVGRootElement = document.importNode(svgDoc.documentElement, true);
				$('body').append(importedSVGRootElement);
			}, 'xml');

		this.ready
			.done(function () {
				that.$el.html('');
				that.router = new that.Routers.Router();
				Backbone.history.start({ pushState: Modernizr.history });

				that.Header = new WC.Views.Header();
			});

	},

	buildData: function () {
		var that = this,
			teams = $.getJSON('http://wc14.kollectiv.org/api/?endpoint=teams'),
			matches = $.getJSON('http://wc14.kollectiv.org/api/?endpoint=matches'),
			players = $.getJSON('http://wc14.kollectiv.org/api/?endpoint=players');

		$.when(teams, matches, players)
			.done(function (teamsResponse, matchesResponse, playersResponse) {
				that.data.teams = teamsResponse[0];
				that.data.matches = matchesResponse[0];
				that.data.players = playersResponse[0];

				_.each(that.data.matches, function (d) {

					if (d.status === 'Final') {
						if (d.homeScore === d.awayScore) {
							that.data.stats.totalDraws++;
						}

						if (d.homeScore === 0 && d.homeScore === d.awayScore) {
							that.data.stats.totalDrawsZero++;
						}

						if (!that.data.stats.totalPerVenue[that.data.venues[d.venue]]) {
							that.data.stats.totalPerVenue[that.data.venues[d.venue]] = 0;
						}
						that.data.stats.totalPerVenue[that.data.venues[d.venue]] += (d.homeScore + d.awayScore);

						that.data.stats.totalMatches++;
					}

					that.data.stats.totalGoals += (d.homeScore + d.awayScore);
				});

				that.data.stats.goalsPerGame = parseFloat((that.data.stats.totalGoals / that.data.stats.totalMatches).toFixed(2));
				that.data.stats.totalPerVenueSorted = Object.keys(that.data.stats.totalPerVenue).sort(function(a,b) {
					return that.data.stats.totalPerVenue[b] - that.data.stats.totalPerVenue[a];
				});

				that.ready.resolve();
			})
			.fail(function () {
			});
	},

	getTeam: function (id) {
		var teams = _.filter(WC.data.teams, function (d) {
			return d.id === id;
		});
		return teams[0];
	},

	getMatch: function (id) {
		var matches = _.filter(WC.data.matches, function (d) {
			return d.id === id;
		});
		return matches[0];
	},

	getMatches: function (teamId) {
		var matches = _.filter(WC.data.matches, function (d) {
			return d.homeTeamId === teamId || d.awayTeamId === teamId;
		});

		matches = _(matches).sortBy(function(match) {
			return match.startTime;
		});

		return matches;
	},

	getSecRoundMatches: function () {
		var matches = _.filter(WC.data.matches, function (d) {
			return d.group === null;
		});

		matches = _(matches).sortBy(function(match) {
			return match.startTime;
		});

		return matches;
	},

	getPlayer: function (id) {
		var players = _.filter(WC.data.players, function (d) {
			return d.id === id;
		});
		return players[0];
	},

	getFlag: function (id) {
		var flags = {
			'5841CDD6-D35C-4A2C-B063-0DF8529CB433': 'http://www.geoips.com/assets/img/flag/32/dz.png',
			'8DF9E0C5-F49F-4BCC-967D-EC4FF3C945EE': 'http://www.geoips.com/assets/img/flag/32/ar.png',
			'16EF7687-2D69-473C-BFE7-B781D67752DC': 'http://www.geoips.com/assets/img/flag/32/au.png',
			'AEA9A2F1-3A08-4149-96BD-A6F7433F46BA': 'http://www.geoips.com/assets/img/flag/32/be.png',
			'74EA3831-DA4A-4093-B1E3-FD4EB45AA798': 'http://www.geoips.com/assets/img/flag/32/ba.png',
			'09B8CB53-BB56-4B7E-86BD-EC7FC7CEAF33': 'http://www.geoips.com/assets/img/flag/32/br.png',
			'DF25ABB8-37EB-4C2A-8B6C-BDA53BF5A74D': 'http://www.geoips.com/assets/img/flag/32/cm.png',
			'9A319800-C80A-4FD9-9679-125D27246FB0': 'http://www.geoips.com/assets/img/flag/32/cl.png',
			'AD00D1E4-BA78-41B6-A7DF-E6E102F71042': 'http://www.geoips.com/assets/img/flag/32/co.png',
			'F77B348A-D7AE-4534-8ADA-8E52BEE64744': 'http://www.geoips.com/assets/img/flag/32/cr.png',
			'6B2A7C79-3758-421C-8967-7ABFE1FDC982': 'http://www.geoips.com/assets/img/flag/32/ci.png',
			'A0CD1355-B6FC-48D3-B67B-AF5AA2B2C1E1': 'http://www.geoips.com/assets/img/flag/32/hr.png',
			'8BABAAE8-D906-44F7-B784-A828573B35D9': 'http://www.geoips.com/assets/img/flag/32/ec.png',
			'2EFCFEB2-EBF8-4628-B659-B00C49D93811': 'http://www.geoips.com/assets/img/flag/32/gb.png',
			'4F9F018B-C14D-4E73-8145-2E77B8C64E9E': 'http://www.geoips.com/assets/img/flag/32/fr.png',
			'FE173702-5266-4C67-8647-7A6A53ED0DE8': 'http://www.geoips.com/assets/img/flag/32/de.png',
			'CCC66F75-7004-46E4-BB31-259B06A42516': 'http://www.geoips.com/assets/img/flag/32/gh.png',
			'38C4D44E-CDA3-40E2-8364-DA27CC190C52': 'http://www.geoips.com/assets/img/flag/32/gr.png',
			'17E2DCED-76BB-435D-9E96-68D5B3D490FA': 'http://www.geoips.com/assets/img/flag/32/hn.png',
			'A6F97883-74FE-4162-A65E-10B3D94B71A3': 'http://www.geoips.com/assets/img/flag/32/ir.png',
			'B61B25AA-CD8E-4778-AC26-DD08D7851990': 'http://www.geoips.com/assets/img/flag/32/it.png',
			'F71A08CF-B3C5-414C-9144-308A5EE6DACC': 'http://www.geoips.com/assets/img/flag/32/jp.png',
			'8D6EAC04-14E9-4026-BF2A-AB81C4F3C529': 'http://www.geoips.com/assets/img/flag/32/kr.png',
			'E0D48500-EF6D-40AC-A7A0-0F4B5BD59A9D': 'http://www.geoips.com/assets/img/flag/32/mx.png',
			'FB6842E6-BB62-450D-98C0-A062610E6518': 'http://www.geoips.com/assets/img/flag/32/nl.png',
			'028EDCA8-6D1E-49CC-8442-A7A12E921E09': 'http://www.geoips.com/assets/img/flag/32/ng.png',
			'F5280217-C808-4E1D-BB0E-BF4445687EC5': 'http://www.geoips.com/assets/img/flag/32/pt.png',
			'BBBE6B39-E345-43C7-9E31-A442A866BF60': 'http://www.geoips.com/assets/img/flag/32/ru.png',
			'05A7BADE-915A-4AFB-8C28-702069220E43': 'http://www.geoips.com/assets/img/flag/32/es.png',
			'496A037B-FD32-4917-93E6-335D76C3422C': 'http://www.geoips.com/assets/img/flag/32/ch.png',
			'820A471B-4B85-41E8-97A6-BC3063FE78D9': 'http://www.geoips.com/assets/img/flag/32/us.png',
			'088C4113-CEFC-460C-830C-277C148C0CE7': 'http://www.geoips.com/assets/img/flag/32/uy.png'
		};

		return (flags[id] ? flags[id] : false);
	},

	formatDate: function (timeString) {
		var date = new Date(timeString),
			convertdLocalTime = new Date(date.getTime()); // - (date.getTimezoneOffset() * 60000)

		function pad (num) {
			var norm = Math.abs(Math.floor(num));
			return (norm < 10 ? '0' : '') + norm;
		}

		return {
			date: pad(convertdLocalTime.getMonth() + 1) + '/' + pad(convertdLocalTime.getDate()),
			time: pad(convertdLocalTime.getHours()) + ':' + pad(convertdLocalTime.getMinutes()),
			timestamp: Math.round(convertdLocalTime.getTime() / 1000)
		};
	},

	cleanUp: function () {
		var that = this;

		//console.log('cleanUp', route);

		this.$el.fadeOut(500, function () {
			that.$el.html('').show();
			$('html, body').animate({ scrollTop: 0 });

			_.each(WC.collections, function (d, i) {
				d.remove();
				delete WC.collections[i];
			});

			_.each(WC.views, function (d, i) {
				d.remove();
				delete WC.views[i];
			});

			Backbone.trigger('cleaned');
		});

	}
};
