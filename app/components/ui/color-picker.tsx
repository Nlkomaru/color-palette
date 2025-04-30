import { ColorPicker as PrimitiveColorPicker, parseColor } from '@ark-ui/react/color-picker'

import { sva } from 'styled-system/css'

const colorPicker = sva({
  slots: [
    'root',
    'label',
    'control',
    'trigger',
    'content',
    'area',
    'areaBackground',
    'areaThumb',
    'channelSlider',
    'channelSliderTrack',
    'channelSliderThumb',
    'swatchGroup',
    'swatch',
    'transparencyGrid',
    'channelInput',
    'valueText',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      color: 'oklch(0.3 0 0)',
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    control: {
      display: 'flex',
      flexDirection: 'row',
      gap: '2',
    },
    content: {
      background: 'oklch(1 0 0)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 'sm',
      p: '4',
      zIndex: 'dropdown',
      _open: {
        animation: 'fadeIn 0.25s ease-out',
      },
      _closed: {
        animation: 'fadeOut 0.2s ease-out',
      },
      _hidden: {
        display: 'none',
      },
    },
    area: {
      height: '36',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    areaBackground: {
      height: 'full',
    },
    areaThumb: {
      borderRadius: '50%',
      height: '2.5',
      width: '2.5',
      boxShadow: '0 0 0 2px oklch(1 0 0), 0 0 0 4px oklch(0 0 0 / 0.1)',
      outline: 'none',
    },
    channelSlider: {
      borderRadius: '8px',
    },
    channelSliderTrack: {
      height: '3',
      borderRadius: '8px',
    },
    channelSliderThumb: {
      borderRadius: '50%',
      height: '2.5',
      width: '2.5',
      boxShadow: '0 0 0 2px oklch(1 0 0), 0 0 0 4px oklch(0 0 0 / 0.1)',
      transform: 'translate(-50%, -50%)',
      outline: 'none',
    },
    swatchGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '2',
      background: 'oklch(1 0 0)',
    },
    swatch: {
      height: '6',
      width: '6',
      borderRadius: '8px',
      background: 'rgb(200, 200, 200)',
      boxShadow: '0 0 0 1px oklch(0.5 0 0), 0 0 0 2px oklch(1 0 0) inset',
    },
    transparencyGrid: {
      borderRadius: '8px',
    },
    channelInput: {
      width: '15rem',
      padding: '0.5rem',
      borderRadius: '8px',
      border: '1px solid oklch(0.5 0 0)',
      background: 'oklch(1 0 0)',
      color: 'oklch(0.3 0 0)',
      '&:focus': {
        outline: 'none',
        borderColor: 'oklch(0.7 0 0)',
      },
    },
    valueText: {
      color: 'oklch(0.3 0 0)',
      fontSize: 'sm',
    },
  },
})

export const ColorPicker = () => {
  const styles = colorPicker()
  
  return (
    <PrimitiveColorPicker.Root defaultValue={parseColor('#eb5e41')} className={styles.root}>
      <PrimitiveColorPicker.Label className={styles.label}>Color</PrimitiveColorPicker.Label>
      <PrimitiveColorPicker.Control className={styles.control}>
        <PrimitiveColorPicker.ChannelInput className={styles.channelInput} channel="hex" />
        <PrimitiveColorPicker.ValueText className={styles.valueText} />
        <PrimitiveColorPicker.Trigger className={styles.trigger}>
          <PrimitiveColorPicker.TransparencyGrid className={styles.transparencyGrid} />
          <PrimitiveColorPicker.ValueSwatch className={styles.swatch} />
        </PrimitiveColorPicker.Trigger>
      </PrimitiveColorPicker.Control>
      <PrimitiveColorPicker.Positioner>
        <PrimitiveColorPicker.Content className={styles.content}>
          <PrimitiveColorPicker.FormatTrigger>Toggle ColorFormat</PrimitiveColorPicker.FormatTrigger>
          <PrimitiveColorPicker.FormatSelect />
          <PrimitiveColorPicker.Area className={styles.area}>
            <PrimitiveColorPicker.AreaBackground className={styles.areaBackground} />
            <PrimitiveColorPicker.AreaThumb className={styles.areaThumb} />
          </PrimitiveColorPicker.Area>
          <PrimitiveColorPicker.ChannelSlider channel="hue" className={styles.channelSlider}>
            <PrimitiveColorPicker.ChannelSliderTrack className={styles.channelSliderTrack} />
            <PrimitiveColorPicker.ChannelSliderThumb className={styles.channelSliderThumb} />
          </PrimitiveColorPicker.ChannelSlider>
          <PrimitiveColorPicker.ChannelSlider channel="alpha" className={styles.channelSlider}>
            <PrimitiveColorPicker.TransparencyGrid className={styles.transparencyGrid} />
            <PrimitiveColorPicker.ChannelSliderTrack className={styles.channelSliderTrack} />
            <PrimitiveColorPicker.ChannelSliderThumb className={styles.channelSliderThumb} />
          </PrimitiveColorPicker.ChannelSlider>
          <PrimitiveColorPicker.SwatchGroup className={styles.swatchGroup}>
            <PrimitiveColorPicker.SwatchTrigger value="red">
              <PrimitiveColorPicker.Swatch value="red" className={styles.swatch}>
                <PrimitiveColorPicker.SwatchIndicator>✓</PrimitiveColorPicker.SwatchIndicator>
              </PrimitiveColorPicker.Swatch>
            </PrimitiveColorPicker.SwatchTrigger>
            <PrimitiveColorPicker.SwatchTrigger value="blue">
              <PrimitiveColorPicker.Swatch value="blue" className={styles.swatch}>
                <PrimitiveColorPicker.SwatchIndicator>✓</PrimitiveColorPicker.SwatchIndicator>
              </PrimitiveColorPicker.Swatch>
            </PrimitiveColorPicker.SwatchTrigger>
            <PrimitiveColorPicker.SwatchTrigger value="green">
              <PrimitiveColorPicker.Swatch value="green" className={styles.swatch}>
                <PrimitiveColorPicker.SwatchIndicator>✓</PrimitiveColorPicker.SwatchIndicator>
              </PrimitiveColorPicker.Swatch>
            </PrimitiveColorPicker.SwatchTrigger>
          </PrimitiveColorPicker.SwatchGroup>
          <PrimitiveColorPicker.View format="rgba">
            <PrimitiveColorPicker.ChannelInput channel="hex" />
            <PrimitiveColorPicker.ChannelInput channel="alpha" />
          </PrimitiveColorPicker.View>
          <PrimitiveColorPicker.View format="hsla">
            <PrimitiveColorPicker.ChannelInput channel="hue" />
            <PrimitiveColorPicker.ChannelInput channel="saturation" />
            <PrimitiveColorPicker.ChannelInput channel="lightness" />
          </PrimitiveColorPicker.View>
          <PrimitiveColorPicker.EyeDropperTrigger>Pick color</PrimitiveColorPicker.EyeDropperTrigger>
        </PrimitiveColorPicker.Content>
      </PrimitiveColorPicker.Positioner>
      <PrimitiveColorPicker.HiddenInput />
    </PrimitiveColorPicker.Root>
  )
}
