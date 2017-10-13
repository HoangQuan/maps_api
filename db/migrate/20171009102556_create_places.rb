class CreatePlaces < ActiveRecord::Migration[5.0]
  def change
    create_table :places do |t|
      t.string :title
      t.text :address
      t.decimal :latitude, precision: 64, scale: 14
      t.decimal :longitude, precision: 64, scale: 14
      t.integer :user_id

      t.timestamps
    end
  end
end
