import json
import random

categories = [
    "Crypto", "Forex", "Stocks", "Commodities", "Indices", 
    "Funds", "Futures", "Bonds", "Options", "ETFs"
]

assets = {
    "Crypto": [
        ("BTCUSD", "Bitcoin"), ("ETHUSD", "Ethereum"), ("BNBUSD", "Binance Coin"), ("XRPUSD", "Ripple"),
        ("ADAUSD", "Cardano"), ("SOLUSD", "Solana"), ("DOTUSD", "Polkadot"), ("DOGEUSD", "Dogecoin"),
        ("AVAXUSD", "Avalanche"), ("LUNAUSD", "Terra"), ("MATICUSD", "Polygon"), ("LINKUSD", "Chainlink"),
        ("ALGOUSD", "Algorand"), ("LTCUSD", "Litecoin"), ("BCHUSD", "Bitcoin Cash"), ("UNIUSD", "Uniswap"),
        ("XLMUSD", "Stellar"), ("ATOMUSD", "Cosmos"), ("ICPUSD", "Internet Computer"), ("VETUSD", "VeChain"),
        ("FILUSD", "Filecoin"), ("TRXUSD", "Tron"), ("ETCUSD", "Ethereum Classic"), ("THETAUSD", "Theta"),
        ("FTMUSD", "Fantom"), ("NEARUSD", "Near Protocol"), ("EGLDUSD", "Elrond"), ("MANAUSD", "Decentraland"),
        ("SANDUSD", "The Sandbox"), ("AXSUSD", "Axie Infinity")
    ],
    "Forex": [
        ("EURUSD", "Euro/US Dollar"), ("GBPUSD", "British Pound/US Dollar"), ("USDJPY", "US Dollar/Japanese Yen"),
        ("AUDUSD", "Australian Dollar/US Dollar"), ("USDCAD", "US Dollar/Canadian Dollar"), ("USDCHF", "US Dollar/Swiss Franc"),
        ("NZDUSD", "New Zealand Dollar/US Dollar"), ("EURGBP", "Euro/British Pound"), ("EURJPY", "Euro/Japanese Yen"),
        ("GBPJPY", "British Pound/Japanese Yen"), ("AUDJPY", "Australian Dollar/Japanese Yen"), ("EURCHF", "Euro/Swiss Franc"),
        ("GBPCHF", "British Pound/Swiss Franc"), ("CADJPY", "Canadian Dollar/Japanese Yen"), ("CHFJPY", "Swiss Franc/Japanese Yen"),
        ("EURAUD", "Euro/Australian Dollar"), ("EURNZD", "Euro/New Zealand Dollar"), ("GBPAUD", "British Pound/Australian Dollar"),
        ("GBPNZD", "British Pound/New Zealand Dollar"), ("AUDNZD", "Australian Dollar/New Zealand Dollar"),
        ("AUDCAD", "Australian Dollar/Canadian Dollar"), ("AUDCHF", "Australian Dollar/Swiss Franc"),
        ("CADCHF", "Canadian Dollar/Swiss Franc"), ("NZDJPY", "New Zealand Dollar/Japanese Yen"),
        ("EURCAD", "Euro/Canadian Dollar"), ("GBPCAD", "British Pound/Canadian Dollar"), ("NZDCAD", "New Zealand Dollar/Canadian Dollar"),
        ("NZDCHF", "New Zealand Dollar/Swiss Franc"), ("USDNOK", "US Dollar/Norwegian Krone"), ("USDSEK", "US Dollar/Swedish Krona")
    ],
    "Stocks": [
        ("AAPL", "Apple Inc."), ("MSFT", "Microsoft Corp."), ("GOOGL", "Alphabet Inc."), ("AMZN", "Amazon.com Inc."),
        ("TSLA", "Tesla Inc."), ("META", "Meta Platforms Inc."), ("NVDA", "Nvidia Corp."), ("BRK.B", "Berkshire Hathaway"),
        ("JNJ", "Johnson & Johnson"), ("V", "Visa Inc."), ("TSM", "Taiwan Semiconductor"), ("UNH", "UnitedHealth Group"),
        ("WMT", "Walmart Inc."), ("XOM", "Exxon Mobil Corp."), ("JPM", "JPMorgan Chase & Co."), ("MA", "Mastercard Inc."),
        ("PG", "Procter & Gamble"), ("AVGO", "Broadcom Inc."), ("CVX", "Chevron Corp."), ("HD", "Home Depot Inc."),
        ("LLY", "Eli Lilly & Co."), ("ABBV", "AbbVie Inc."), ("ASML", "ASML Holding"), ("KO", "Coca-Cola Co."),
        ("PEP", "PepsiCo Inc."), ("MRK", "Merck & Co."), ("COST", "Costco Wholesale"), ("ORCL", "Oracle Corp."),
        ("ADBE", "Adobe Inc."), ("TMO", "Thermo Fisher Scientific")
    ],
    "Commodities": [
        ("XAUUSD", "Gold Spot"), ("SILVER", "Silver Spot"), ("CRUDE_OIL", "WTI Crude Oil"), ("BRENT_OIL", "Brent Crude Oil"),
        ("NATURAL_GAS", "Natural Gas"), ("COPPER", "Copper High Grade"), ("PLATINUM", "Platinum Spot"), ("PALLADIUM", "Palladium Spot"),
        ("CORN", "Corn Futures"), ("WHEAT", "Wheat Futures"), ("SOYBEANS", "Soybeans Futures"), ("COFFEE", "Coffee Arabica"),
        ("SUGAR", "Sugar No. 11"), ("COTTON", "Cotton No. 2"), ("COCOA", "Cocoa Futures"), ("LIVE_CATTLE", "Live Cattle"),
        ("LEAN_HOGS", "Lean Hogs"), ("ALUMINUM", "Aluminum Futures"), ("NICKEL", "Nickel Futures"), ("ZINC", "Zinc Futures"),
        ("GASOLINE", "RBOB Gasoline"), ("HEATING_OIL", "Heating Oil"), ("SOYBEAN_OIL", "Soybean Oil"), ("SOYBEAN_MEAL", "Soybean Meal"),
        ("OATS", "Oats Futures"), ("ROUGH_RICE", "Rough Rice"), ("CANOLA", "Canola Futures"), ("LUMBER", "Lumber Futures"),
        ("ORANGE_JUICE", "Orange Juice"), ("RUBBER", "Rubber Futures")
    ],
    "Indices": [
        ("SPX500", "S&P 500"), ("NAS100", "Nasdaq 100"), ("DJI30", "Dow Jones Industrial Average"), ("GER40", "DAX 40"),
        ("UK100", "FTSE 100"), ("FRA40", "CAC 40"), ("JPN225", "Nikkei 225"), ("HKG33", "Hang Seng Index"),
        ("AUS200", "ASX 200"), ("ESP35", "IBEX 35"), ("EUSTX50", "Euro Stoxx 50"), ("SUI20", "SMI 20"),
        ("IT40", "FTSE MIB"), ("NLD25", "AEX Index"), ("STOXX600", "Stoxx Europe 600"), ("VIX", "Volatility Index"),
        ("RUS2000", "Russell 2000"), ("CN50", "China A50"), ("IND50", "Nifty 50"), ("TW50", "Taiwan Weighted"),
        ("SG30", "MSCI Singapore"), ("TH30", "SET Index"), ("MYR30", "KLCI Index"), ("PH30", "PSEi Index"),
        ("ID30", "JSX Index"), ("KOR200", "KOSPI 200"), ("POL20", "WIG20"), ("TURK", "BIST 100"),
        ("SAUDI", "Tadawul All Share"), ("BRAZIL", "Bovespa Index")
    ],
    "Funds": [
        ("VFINX", "Vanguard 500 Index Fund"), ("FBGRX", "Fidelity Blue Chip Growth Fund"), ("VWIGX", "Vanguard International Growth"),
        ("AGTHX", "American Funds Growth Fund"), ("FCNTX", "Fidelity Contrafund"), ("PRGFX", "T. Rowe Price Growth Stock"),
        ("VGTSX", "Vanguard Total Intl Stock"), ("VTSAX", "Vanguard Total Stock Market"), ("SWPPX", "Schwab S&P 500 Index"),
        ("PREIX", "T. Rowe Price Equity Index"), ("FSTVX", "Fidelity Total Market Index"), ("VFIAX", "Vanguard 500 Index Admiral"),
        ("VHGEX", "Vanguard Global Equity"), ("VEUSX", "Vanguard European Stock"), ("VPACX", "Vanguard Pacific Stock"),
        ("VEMAX", "Vanguard Emerging Markets"), ("VBTLX", "Vanguard Total Bond Market"), ("VTABX", "Vanguard Total Intl Bond"),
        ("VTEAX", "Vanguard Tax-Exempt Bond"), ("VWIUX", "Vanguard Interm-Term Tax-Exempt"), ("VWITX", "Vanguard Interm-Term Bond"),
        ("VFSUX", "Vanguard Short-Term Corp"), ("VBIRX", "Vanguard Short-Term Bond"), ("VSCSX", "Vanguard Short-Term Invest"),
        ("VUSUX", "Vanguard Long-Term Treasury"), ("VBLTX", "Vanguard Long-Term Bond"), ("VWLTX", "Vanguard Long-Term Invest"),
        ("VMFXX", "Vanguard Federal Money Market"), ("VMMXX", "Vanguard Prime Money Market"), ("VGTX", "Vanguard Info Tech Index")
    ],
    "Futures": [
        ("ES", "E-mini S&P 500 Futures"), ("NQ", "E-mini Nasdaq 100 Futures"), ("YM", "E-mini Dow Jones Futures"),
        ("GC", "Gold Futures"), ("SI", "Silver Futures"), ("CL", "Crude Oil Futures"), ("NG", "Natural Gas Futures"),
        ("HG", "Copper Futures"), ("PL", "Platinum Futures"), ("PA", "Palladium Futures"), ("ZC", "Corn Futures"),
        ("ZW", "Wheat Futures"), ("ZS", "Soybean Futures"), ("KC", "Coffee Futures"), ("SB", "Sugar Futures"),
        ("CT", "Cotton Futures"), ("CC", "Cocoa Futures"), ("LB", "Lumber Futures"), ("OJ", "Orange Juice Futures"),
        ("RR", "Rough Rice Futures"), ("GF", "Feeder Cattle Futures"), ("HE", "Lean Hog Futures"), ("LE", "Live Cattle Futures"),
        ("RB", "Gasoline Futures"), ("HO", "Heating Oil Futures"), ("ZL", "Soybean Oil Futures"), ("ZM", "Soybean Meal Futures"),
        ("ZO", "Oats Futures"), ("ZR", "Rough Rice Futures"), ("ZT", "2-Year Note Futures")
    ],
    "Bonds": [
        ("US10Y", "US 10-Year Treasury Note"), ("US30Y", "US 30-Year Treasury Bond"), ("US5Y", "US 5-Year Treasury Note"),
        ("US2Y", "US 2-Year Treasury Note"), ("UK10Y", "UK 10-Year Gilt"), ("GER10Y", "Germany 10-Year Bund"),
        ("JPN10Y", "Japan 10-Year JGB"), ("FRA10Y", "France 10-Year OAT"), ("ITA10Y", "Italy 10-Year BTP"),
        ("CAN10Y", "Canada 10-Year Bond"), ("AUS10Y", "Australia 10-Year Bond"), ("ESP10Y", "Spain 10-Year Bond"),
        ("GRC10Y", "Greece 10-Year Bond"), ("PRT10Y", "Portugal 10-Year Bond"), ("IRL10Y", "Ireland 10-Year Bond"),
        ("BEL10Y", "Belgium 10-Year Bond"), ("AUT10Y", "Austria 10-Year Bond"), ("FIN10Y", "Finland 10-Year Bond"),
        ("NLD10Y", "Netherlands 10-Year Bond"), ("SWE10Y", "Sweden 10-Year Bond"), ("CHE10Y", "Switzerland 10-Year Bond"),
        ("NOR10Y", "Norway 10-Year Bond"), ("DNK10Y", "Denmark 10-Year Bond"), ("NZD10Y", "New Zealand 10-Year Bond"),
        ("MEX10Y", "Mexico 10-Year Bond"), ("BRA10Y", "Brazil 10-Year Bond"), ("IND10Y", "India 10-Year Bond"),
        ("ZAF10Y", "South Africa 10-Year Bond"), ("CHN10Y", "China 10-Year Bond"), ("RUS10Y", "Russia 10-Year Bond")
    ],
    "Options": [
        ("SPY_OPT", "S&P 500 ETF Options"), ("QQQ_OPT", "Nasdaq 100 ETF Options"), ("IWM_OPT", "Russell 2000 ETF Options"),
        ("VXX_OPT", "VIX Short-Term Futures Options"), ("GLD_OPT", "Gold Trust Options"), ("SLV_OPT", "Silver Trust Options"),
        ("USO_OPT", "United States Oil Fund Options"), ("TLT_OPT", "20+ Year Treasury Bond Options"), ("HYG_OPT", "High Yield Corp Bond Options"),
        ("EEM_OPT", "MSCI Emerging Markets Options"), ("EFA_OPT", "MSCI EAFE ETF Options"), ("FXI_OPT", "China Large-Cap ETF Options"),
        ("EWZ_OPT", "MSCI Brazil ETF Options"), ("GDX_OPT", "Gold Miners ETF Options"), ("XLF_OPT", "Financial Select Sector Options"),
        ("XLK_OPT", "Technology Select Sector Options"), ("XLE_OPT", "Energy Select Sector Options"), ("XLV_OPT", "Health Care Select Sector Options"),
        ("XLP_OPT", "Consumer Staples Select Sector Options"), ("XLY_OPT", "Consumer Discretionary Options"), ("XLI_OPT", "Industrial Select Sector Options"),
        ("XLB_OPT", "Materials Select Sector Options"), ("XLU_OPT", "Utilities Select Sector Options"), ("XLRE_OPT", "Real Estate Select Sector Options"),
        ("TSLA_OPT", "Tesla Stock Options"), ("AAPL_OPT", "Apple Stock Options"), ("AMZN_OPT", "Amazon Stock Options"),
        ("MSFT_OPT", "Microsoft Stock Options"), ("NVDA_OPT", "Nvidia Stock Options"), ("GOOGL_OPT", "Alphabet Stock Options")
    ],
    "ETFs": [
        ("SPY", "SPDR S&P 500 ETF Trust"), ("IVV", "iShares Core S&P 500 ETF"), ("VOO", "Vanguard S&P 500 ETF"),
        ("QQQ", "Invesco QQQ Trust"), ("VTI", "Vanguard Total Stock Market ETF"), ("IWM", "iShares Russell 2000 ETF"),
        ("EFA", "iShares MSCI EAFE ETF"), ("VEA", "Vanguard FTSE Developed Markets"), ("VWO", "Vanguard FTSE Emerging Markets"),
        ("AGG", "iShares Core U.S. Aggregate Bond"), ("BND", "Vanguard Total Bond Market ETF"), ("GLD", "SPDR Gold Shares"),
        ("SLV", "iShares Silver Trust"), ("USO", "United States Oil Fund LP"), ("TLT", "iShares 20+ Year Treasury Bond"),
        ("LQD", "iShares iBoxx $ Invst Grade Corp"), ("HYG", "iShares iBoxx $ High Yield Corp"), ("TIP", "iShares TIPS Bond ETF"),
        ("BSV", "Vanguard Short-Term Bond ETF"), ("BNDX", "Vanguard Total Intl Bond ETF"), ("EMB", "iShares J.P. Morgan USD Emerg Bond"),
        ("SHV", "iShares Short Treasury Bond ETF"), ("IEI", "iShares 3-7 Year Treasury Bond"), ("IEF", "iShares 7-10 Year Treasury Bond"),
        ("VIG", "Vanguard Dividend Appreciation"), ("VYM", "Vanguard High Dividend Yield"), ("SCHD", "Schwab US Dividend Equity"),
        ("ARKK", "ARK Innovation ETF"), ("SMH", "VanEck Semiconductor ETF"), ("BOTZ", "Global X Robotics & AI ETF")
    ]
}

def generate_sql():
    sql = "INSERT INTO market_assets (\n"
    sql += "  id, symbol, name, category, exchange, price, change_24h, volume,\n"
    sql += "  leverage, min_trade_size, max_trade_size, tick_size, enabled, created_at, updated_at\n"
    sql += ") VALUES\n"
    
    rows = []
    now_ms = "now_ms"
    
    count = 0
    for cat in categories:
        for symbol, name in assets[cat]:
            if count >= 269:
                break
            
            id_val = f"ast_{symbol.lower()}"
            exchange = "EXCHANGE"
            if cat == "Crypto": exchange = "BINANCE"
            elif cat == "Forex": exchange = "FOREX"
            elif cat in ["Stocks", "ETFs"]: exchange = "NASDAQ"
            elif cat == "Commodities": exchange = "COMEX"
            elif cat == "Indices": exchange = "GLOBAL"
            
            price = round(random.uniform(1, 50000), 2) if cat == "Crypto" else round(random.uniform(1, 1000), 2)
            if cat == "Forex": price = round(random.uniform(0.5, 150), 4)
            
            change = round(random.uniform(-5, 5), 2)
            volume = random.randint(100000, 1000000000)
            
            leverage = {
                "basic": 10 if cat in ["Stocks", "ETFs", "Funds"] else 30,
                "standard": 20 if cat in ["Stocks", "ETFs", "Funds"] else 50,
                "premium": 50 if cat in ["Stocks", "ETFs", "Funds"] else 100
            }
            
            min_size = 0.01 if cat in ["Crypto", "Forex", "Commodities"] else 1
            max_size = 10000
            tick_size = 0.0001 if cat == "Forex" else 0.01
            
            row = f"  ('{id_val}', '{symbol}', '{name}', '{cat}', '{exchange}', {price}, {change}, {volume}, "
            row += f"'{json.dumps(leverage)}'::jsonb, {min_size}, {max_size}, {tick_size}, true, {now_ms}, {now_ms})"
            rows.append(row)
            count += 1
        if count >= 269:
            break
            
    sql += ",\n".join(rows)
    sql += "\nON CONFLICT (symbol) DO NOTHING;"
    return sql

print(generate_sql())
