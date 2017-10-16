class PlacesController < ApplicationController
  def index
    @places = Place.order('created_at DESC')
  end

  def new
    @place = Place.new
  end

  def show
    @place = Place.find(params[:id])
  end

  def edit
    @place = Place.find(params[:id])    
  end

  def create
    @place = Place.new(place_params)
    if @place.save
      flash[:success] = "Place added!"
      redirect_to place_path(@place)
    else
      render 'new'
    end
  end

  def update
    @place = Place.find(params[:id])
    if @place.update_attributes(place_params)
      flash[:success] = 'Updated'
      redirect_to place_path(@place)
    else
      render 'edit'
    end
  end
  private

  def place_params
    params.require(:place).permit(:title, :address, :user_id, :latitude, :longitude, green_tees_attributes: [:id, :longitude, :latitude, :_destroy])
  end
end