import { type Color, parseColor } from "@react-stately/color";
import { atom, useAtom } from "jotai";
import { ColorField } from "./ui/color-field";
import { TextField } from "./ui/text-field";
// カラー状態をグローバルに管理するためのatomを定義
const colorAtom = atom(parseColor("#069606"));

export function ColorDisplay() {
  // jotaiのuseAtomフックを使用してカラー状態を管理
  const [color, setColor] = useAtom(colorAtom);

  return (
    <div className="flex flex-col gap-y-4">
      <TextField label="id" className="w-56" placeholder="green" />
      <ColorField
        className="w-56"
        value={color}
        aria-label="Pick a color"
        onChange={(newColor: Color | null) => {
          // 新しいカラーが有効な場合のみ状態を更新
          newColor !== null && setColor(newColor);
        }}
        placeholder="#FAFAFA"
      />
    </div>
  );
}
