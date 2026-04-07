import { BarChart, Bar, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip  } from "recharts";

export default function ChartBar({info}) {
    return(
        <div className="chart-container"
            style={{
                color:"#221e25",
                padding: "12px",
                borderRadius: "10px",
                marginBottom:"20px",
                background:"white"
            }}
            >
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={info}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="apartment" tick={{ fill: "#221e25", fontSize: 15, fontWeight:500}} />
                <YAxis tick={{ fill: "#221e25", fontSize: 15, fontWeight:500}}/>
                <Tooltip
                    contentStyle={{ 
                        padding: "5px 10px",
                        backgroundColor: "#d4d4d4", 
                        borderRadius: "8px",
                        fontSize:"15px",
                    }}
                    itemStyle={{ color: "#221e25", fontSize:"15px" }}
                />
                <Bar dataKey="price" fill="#7f3cf3" radius={[8, 8, 0, 0]} barSize={60} opacity={0.8} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}