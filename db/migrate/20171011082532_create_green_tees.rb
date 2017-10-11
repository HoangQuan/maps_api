class CreateGreenTees < ActiveRecord::Migration[5.0]
  def change
    create_table :green_tees do |t|
      t.float :longitude
      t.float :latitude
      t.integer :place_id

      t.timestamps
    end
  end
end
