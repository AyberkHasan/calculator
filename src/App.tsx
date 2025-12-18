
import { useEffect, useState } from "react";
import { create, all } from "mathjs";
import { loadHistory, saveHistory, uid } from "./lib/history";
import type { HistoryItem } from "./lib/history";

const math = create(all, {
  number: "number",
  precision: 64,
});

export default function App() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  function calculate() {
    try {
      if (!expression.trim()) return;

      const value = math.evaluate(expression);
      const res = value.toString();

      setResult(res);

      setHistory((prev) => [
        { id: uid(), expr: expression, result: res, at: Date.now() },
        ...prev,
      ]);

      setExpression(res);
    } catch {
      setResult("Error");
    }
  }

  function append(val: string) {
    setExpression((prev) => prev + val);
  }

  function clearAll() {
    setExpression("");
    setResult("");
  }

  return (
    <div className="container">
      <h1>Calculator</h1>

      <div className="display">
        <div className="expr">{expression || "0"}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        {[
          "7","8","9","/",
          "4","5","6","*",
          "1","2","3","-",
          "0",".","+","(",")"
        ].map((b) => (
          <button key={b} onClick={() => append(b)}>
            {b}
          </button>
        ))}

        <button className="equals" onClick={calculate}>=</button>
        <button className="clear" onClick={clearAll}>C</button>
      </div>

      <h2>History</h2>
      <ul className="history">
        {history.map((h) => (
          <li key={h.id} onClick={() => setExpression(h.expr)}>
            {h.expr} = <strong>{h.result}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
