class CreateGreenTees < ActiveRecord::Migration[5.0]
  def change
    create_table :green_tees do |t|
      t.decimal :longitude, precision: 64, scale: 14
      t.decimal :latitude, precision: 64, scale: 14
      t.integer :place_id

      t.timestamps
    end
  end
end
